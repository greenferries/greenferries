const { getEcoscore } = require('../lib/ecoscore')
const { getThetisByImo } = require('../lib/thetis_by_imo')

const bySlug = arr =>
  Object.fromEntries(arr.map(obj => [obj.slug, obj]))

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

module.exports = {
  hydrated: async data => {
    const cities = Object.values(data.cities).map(x => ({ ...x }))
    const companies = Object.values(data.companies).map(x => ({ ...x }))
    const routes = Object.values(data.routes).map(x => ({ ...x }))
    const ships = Object.values(data.ships).map(x => ({ ...x }))
    const thetisByImo = await getThetisByImo(ships.map(s => s.imo))
    const shipsByCompanySlug = groupBy(ships, 'company')
    const citiesBySlug = bySlug(cities)
    const routesBySlug = bySlug(routes)
    const companiesBySlug = bySlug(companies)
    for (const company of companies) {
      company.ships = shipsByCompanySlug[company.slug]
    }
    const shipRoutesByRouteSlug = groupBy(
      ships.map(ship => ship.routes.map(routeSlug => ({ ship, routeSlug }))).flat(),
      'routeSlug'
    )
    for (const route of routes) {
      route.cityA = citiesBySlug[route.cityA]
      route.cityB = citiesBySlug[route.cityB]
      route.shipRoutes = shipRoutesByRouteSlug[route.slug] || []
      route.shipsCount = route.shipRoutes.length
    }
    for (const ship of ships) {
      ship.thetis = thetisByImo[ship.imo.toString()]
      ship.company = companiesBySlug[ship.company]
      ship.ecoscore = ship.thetis && ship.thetis['2019'] && getEcoscore(ship.thetis['2019'].annualAverageCo2EmissionsPerTransportWorkPax)
      ship.shipRoutes = ship.routes.map(routeSlug => {
        const route = routesBySlug[routeSlug]
        return { route }
      })
    }
    return { cities, companies, routes, ships }
  },
  hydratedBySlug: data => {
    if (!data.hydrated) return
    return {
      cities: bySlug(data.hydrated.cities),
      companies: bySlug(data.hydrated.companies),
      routes: bySlug(data.hydrated.routes),
      ships: bySlug(data.hydrated.ships)
    }
  }
}
