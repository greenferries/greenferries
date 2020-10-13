const slug = require('slug');
const { getEcoscore } = require("./ecoscore")

const augmentShip = ship => (
  {
    ...ship,
    slug: slug(`${ship.name}_${ship.imo}`),
    ecoscore: getEcoscore(ship.thetisAverageCo2PerPax),
  }
)

const augmentRoute = route => (
  {
    ...route,
    slug: slug(`${route.cityA.name}-${route.cityA.country}-${route.cityB.name}-${route.cityB.country}`),
  }
)

module.exports = { augmentShip, augmentRoute }
