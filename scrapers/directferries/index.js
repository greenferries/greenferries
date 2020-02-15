const puppeteer = require('puppeteer-extra')
const slugify = require('@sindresorhus/slugify')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const allRegions = require('./allRegions.json')
const regionsSlugsWhitelist = require('./regionsSlugsWhitelist.json')
const mongoose = require('mongoose')
const queue = require('async/queue')
const ShipRoute = require('./ShipRoute')
const DB_URL = 'mongodb://localhost/greenferries_scraper'

puppeteer.use(StealthPlugin())
// cf https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set('useFindAndModify', false)

async function scrapeRoute ({ page, shipRoute, targetRouteName }) {
  await page.goto('https://www.directferries.fr/')
  await page.click('#journey_oneway')

  await page.click('#route_outbound')
  await page.keyboard.type(targetRouteName)
  await page.waitFor(300)

  const routeSel = '.route_list .routes_outbound li'
  const routeNames = await page.evaluate((routeSel) =>
    Array.prototype.map.call(
      document.querySelectorAll(routeSel),
      elt => elt.getAttribute('data-routename')
    )
  , routeSel)
  const routeIdx = routeNames.findIndex(n => slugify(n) === slugify(targetRouteName))
  if (routeIdx < 0) {
    console.log(`route mismatch : ${targetRouteName} not in ${routeNames}`)
    return
  }
  const routeOpts = await page.$$(routeSel)
  await routeOpts[routeIdx + 1].click()
  await page.waitFor(100)

  const ERROR_SEL = '.deal_finder_wrap .error_messages li'
  const error = await page.$(ERROR_SEL)
  if (error) {
    const msg = await page.evaluate(
      (ERROR_SEL) => document.querySelector(ERROR_SEL).innerHTML, [ERROR_SEL]
    )
    let updates = { dateCrawled: new Date(), ships: [] }
    if (msg.includes('pas ouvertes')) {
      updates = { ...updates, unavailable: true }
    }
    console.log(`got error ${msg}, skipping route ${targetRouteName}`)
    await ShipRoute.findOneAndUpdate(
      { ...shipRoute },
      updates,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return
  }

  await page.waitFor(500)
  await page.click('.journey_timing')
  await page.waitFor(500)
  const datesContainer = await page.waitForSelector('.mbsc-fr-c', { visible: true })
  await page.waitForSelector('.mbsc-btn-e', { visible: true })
  const dates = await datesContainer.$$('.mbsc-btn-e')
  try { await dates[3].click() } catch {}
  await page.click('.df_submit') // submit date
  await page.click('.df_submit') // submit default time
  await page.waitFor(100)

  await page.click('.journey_details.vehicle.trip_outbound')

  await page.click('#vehicle_type_0')

  await page.click('.deal_finder_wrap .df_submit')

  await page.waitForSelector('#divQuotesContainer .quote_item', { visible: true })

  const ships = await page.evaluate(() =>
    Array.prototype.map.call(
      document.querySelectorAll('.quote_item'),
      elt => {
        const tooltip = elt.querySelector('.details>div:nth-child(1)[data-toggle=tooltip]')
        if (tooltip) {
          if (!tooltip.innerText.toLowerCase().includes('alternative')) {
            console.log(`ignoring unknown tooltip: ${tooltip.innerText}`)
          }
          return null
        }
        const shipElt = elt.querySelector('.ship2>span, .details .ship')
        const shipName = shipElt ? shipElt.innerHTML : null
        const companyName = elt.querySelector('.logo>div>span').innerHTML
        return { shipName, companyName }
      }
    ).filter(e => e != null)
  )
  console.log(`found ${ships.length} ships quotes`)

  console.log(`upserting ${targetRouteName} with ships`, ships)
  await ShipRoute.findOneAndUpdate(
    shipRoute,
    { dateCrawled: new Date(), ships },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
}

async function tryToScrapeRoute ({ browser, route }, callback) {
  const targetRouteName = route.join(' - ')
  const [cityA, cityB] = route
  const shipRoute = await ShipRoute.findOne({ cityA, cityB })
  if (shipRoute) {
    console.log(`route ${targetRouteName} already crawled, skipped`)
  } else {
    const shipRoute = { cityA, cityB }
    console.log(`start scraping route ${targetRouteName}...`)
    const page = await browser.newPage()
    try {
      await scrapeRoute({ page, shipRoute, targetRouteName })
    } catch (error) {
      console.log(error)
    }
    page.close()
  }
  callback()
}

async function run () {
  await mongoose.connect(DB_URL)

  // const page = await browser.newPage()
  // await scrapeRoute({ page, cityA: 'Civitavecchia', cityB: 'Porto Torres', targetRouteName: 'Civitavecchia - Porto Torres' })

  const browsers = []
  const queues = []
  for (const idx of [0, 1, 2, 3, 4]) {
    browsers.push(await puppeteer.launch({ slowMo: 100 }))
    queues.push(
      queue(
        ({ route }, callback) => tryToScrapeRoute({ browser: browsers[idx], route }, callback)
      )
    )
  }

  let currIdx = 0
  const whitelistedRegions = allRegions.filter(r => regionsSlugsWhitelist.includes(r.slug))
  for (const region of whitelistedRegions) {
    for (const routeIdx in region.routes) {
      const route = region.routes[routeIdx]
      currIdx = (currIdx + 1) % queues.length
      queues[currIdx].push({ route })
    }
  }

  for (const q of queues) await q.drain()
}

run()
