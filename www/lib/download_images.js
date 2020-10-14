const request = require('request')
const fs = require('fs')
const path = require('path')
const getCompanies = require('../_data/companies')
const getShips = require('../_data/ships')

const downloadPromise = (url, filepath) =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(filepath)) {
      console.log(`${filepath} already exists!`)
      resolve()
    } else {
      console.log(`downloading ${url} to ${filepath}...`)
      const file = fs.createWriteStream(filepath)
      request({ uri: url })
        .pipe(file)
        .on('finish', () => {
          console.log('The file is finished downloading.')
          resolve()
        })
        .on('error', (error) => {
          reject(error)
        })
    }
  })
    .catch(error => {
      console.log(`Something happened: ${error}`)
    })

const main = async () => {
  const companies = await getCompanies()
  for (const company of Object.values(companies)) {
    const filepath = path.join(__dirname, `../assets/img/company_logos/${company.logoKey}.png`)
    await downloadPromise(company.logoUrl, filepath)
  }

  const ships = await getShips()
  for (const ship of Object.values(ships)) {
    if (ship.wikipediaThumbUrl) {
      const filepath = path.join(__dirname, '../assets', ship.thumbPath)
      await downloadPromise(ship.wikipediaThumbUrl, filepath)
    }
  }
}

(async () => await main())()
