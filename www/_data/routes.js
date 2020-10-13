const { dbQueryAll } = require('../lib/db_query')
const { hydrateRows, getTablesColumns, sliceRow }  = require("../lib/hydrate")
const { augmentShip, augmentRoute } = require("../lib/augmenters");

const hydrateRow = async (row) => {
  const route = await sliceRow(row, "routes")
  const shipRoute = await sliceRow(row, "ship_routes", "ship_route_")
  const cityA = await sliceRow(row, "cities", "city_a_")
  const cityB = await sliceRow(row, "cities", "city_b_")
  const hasShipRoute = !Object.values(shipRoute).every(k => k == null)
  if (hasShipRoute) {
    shipRoute.ship = augmentShip(await sliceRow(row, "ships", "ship_"))
    shipRoute.ship.company = await sliceRow(row, "companies", "company_")
  }
  const item = {
    ...route,
    cityA, cityB,
    shipRoutes: hasShipRoute ? [shipRoute] : []
  }
  return augmentRoute(item)
}

const getRows = async () => {
  const tablesColumns = await getTablesColumns()
  return await dbQueryAll(`
      SELECT
        routes.*,
        ${tablesColumns.ship_routes.map(col => `ship_routes.${col} AS ship_route_${col}`).join(", ")},
        ${tablesColumns.ships.map(col => `ships.${col} AS ship_${col}`).join(", ")},
        ${tablesColumns.companies.map(col => `companies.${col} AS company_${col}`).join(", ")},
        ${tablesColumns.cities.map(col => `cities_a.${col} AS city_a_${col}`).join(", ")},
        ${tablesColumns.cities.map(col => `cities_b.${col} AS city_b_${col}`).join(", ")}
      FROM routes
      LEFT JOIN ship_routes ON ship_routes.route_id = routes.id
      LEFT JOIN ships ON ships.id = ship_routes.ship_id
      LEFT JOIN companies AS companies ON companies.id = ships.company_id
      LEFT JOIN cities AS cities_a ON cities_a.id = routes.city_a_id
      LEFT JOIN cities AS cities_b ON cities_b.id = routes.city_b_id
    `
  )
}

module.exports = async function() {
  const routes = await hydrateRows(await getRows(), hydrateRow)
  return routes
}
