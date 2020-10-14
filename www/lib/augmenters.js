const slug = require('slug')
const path = require('path')
const { getEcoscore } = require('./ecoscore')

const augmentShip = ship => (
  {
    ...ship,
    slug: slug(`${ship.name}_${ship.imo}`),
    ecoscore: getEcoscore(ship.thetisAverageCo2PerPax),
    thumbBasename: ship.wikipediaThumbUrl && path.basename(ship.wikipediaThumbUrl),
    thumbPath: ship.wikipediaThumbUrl && `/img/ship_thumbs/${path.basename(ship.wikipediaThumbUrl)}`
  }
)

const augmentRoute = route => (
  {
    ...route,
    slug: slug(`${route.cityA.name}-${route.cityA.country}-${route.cityB.name}-${route.cityB.country}`)
  }
)

const augmentCompany = company => (
  {
    ...company,
    logoUrl: company.logoKey && `https://res.cloudinary.com/outofscreen/image/upload/${company.logoKey}.png`,
    logoPath: company.logoKey && `/img/company_logos/${company.logoKey}.png`,
    slug: slug(`${company.name}-${company.country}`)
  }
)

module.exports = { augmentShip, augmentRoute, augmentCompany }
