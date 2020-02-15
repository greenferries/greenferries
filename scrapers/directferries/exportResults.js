const puppeteer = require('puppeteer-extra')
const slugify = require('@sindresorhus/slugify')
const ShipRoute = require('./ShipRoute')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost/greenferries_scraper'
const fs = require('fs')

async function run () {
  await mongoose.connect(DB_URL)
  const data = await ShipRoute.aggregate([
    { $unwind: { path: '$ships' } },
    { $match: { 'ships.shipName': { $nin: [null, 'General'] } } },
    {
      $group: {
        _id: {
          cityA: '$cityA',
          cityB: '$cityB',
          companyName: '$ships.companyName',
          shipName: '$ships.shipName'
        }
      }
    },
    {
      $project: {
        _id: 0,
        cityA: '$_id.cityA',
        cityB: '$_id.cityB',
        companyName: '$_id.companyName',
        shipName: '$_id.shipName'
      }
    }
  ])
  fs.writeFile('scraped_ship_routes_2020_01_18.json', JSON.stringify(data, null, 2), () => {})
}

run()
