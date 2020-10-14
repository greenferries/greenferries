const { dbQueryAll, getTablesColumns } = require('../lib/db_query')
const { sliceRow, hydrateRows } = require('../lib/hydrate')
const { augmentShip, augmentRoute } = require('../lib/augmenters')

const hydrateRow = async (row) => {
  const ship = await sliceRow(row, 'ships')
  const company = await sliceRow(row, 'companies', 'company_')
  const shipRoute = await sliceRow(row, 'ship_routes', 'ship_route_')
  const hasShipRoute = !Object.values(shipRoute).every(k => k == null)
  if (hasShipRoute) {
    shipRoute.route = await sliceRow(row, 'routes', 'route_')
    shipRoute.route.cityA = await sliceRow(row, 'cities', 'city_a_')
    shipRoute.route.cityB = await sliceRow(row, 'cities', 'city_b_')
    shipRoute.route = augmentRoute(shipRoute.route)
  }
  return {
    ...augmentShip(ship),
    company,
    shipRoutes: hasShipRoute ? [shipRoute] : []
  }
}

const getRows = async () => {
  const tablesColumns = await getTablesColumns()
  return await dbQueryAll(
    `SELECT
      ships.*,
      ${tablesColumns.companies.map(col => `companies.${col} AS company_${col}`).join(', ')},
      ${tablesColumns.ship_routes.map(col => `ship_routes.${col} AS ship_route_${col}`).join(', ')},
      ${tablesColumns.routes.map(col => `routes.${col} AS route_${col}`).join(', ')},
      ${tablesColumns.cities.map(col => `cities_a.${col} AS city_a_${col}`).join(', ')},
      ${tablesColumns.cities.map(col => `cities_b.${col} AS city_b_${col}`).join(', ')}
    FROM ships
    INNER JOIN companies ON companies.id = ships.company_id
    LEFT JOIN ship_routes ON ship_routes.ship_id = ships.id
    LEFT JOIN routes ON routes.id = ship_routes.route_id
    LEFT JOIN cities AS cities_a ON cities_a.id = routes.city_a_id
    LEFT JOIN cities AS cities_b ON cities_b.id = routes.city_b_id
    ORDER BY ships.name`
  )
}

module.exports = async function () {
  const ships = await hydrateRows(await getRows(), hydrateRow)
  return ships
}
