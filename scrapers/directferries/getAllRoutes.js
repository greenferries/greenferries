const puppeteer = require('puppeteer-extra')
const slugify = require('@sindresorhus/slugify')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs')
puppeteer.use(StealthPlugin())

async function run () {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  await page.goto('https://www.ferries.fr')

  const regions = (
    await page.evaluate(() =>
      Array.prototype.map.call(
        document.querySelectorAll('#dpid option'),
        elt => ({ value: elt.value, name: elt.innerText })
      )
    )
  ).map(r => ({ ...r, slug: slugify(r.name) }))
    .filter(r => ['-99', '-1'].indexOf(r.value) === -1)

  for (const region of regions) {
    await page.select('#dpid', region.value)
    const routesBySlug = {};
    (
      await page.evaluate(() =>
        Array.prototype.map.call(
          document.querySelectorAll('#ddrouteout option'),
          elt => ({ value: elt.value, name: elt.innerText })
        )
      )
    ).filter(r => r.value !== '-1')
      .map(r => r.name.split(' - ').sort())
      .forEach(r => { routesBySlug[slugify(r.join('-'))] = r })
    const uniqueRoutes = Object.values(routesBySlug)
    region.routes = uniqueRoutes
  }

  fs.writeFile('allRegions.json', JSON.stringify(regions, null, 2), () => {})
  fs.writeFile('allRegionSlugs.json', JSON.stringify(regions.map(r => r.slug), null, 2), () => {})

  browser.close()
}

run()
