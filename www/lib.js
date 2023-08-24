const sqlite3 = require('sqlite3').verbose()
const open = require('sqlite').open

const camelcase = s => s.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase() })

const camelcaseKeys = (obj) => {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    newObj[camelcase(key)] = obj[key]
  })
  return newObj
}

const getCollectionFromDb = async (sql, { regroupFields } = {}) => {
  const db = await open({
    filename: `${__dirname}/../dbs/www.db`,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY
  })
  const rows = await db.all(sql)
  db.close()

  if (!regroupFields) return rows.map(camelcaseKeys)

  const objsBySlug = {}
  rows.forEach(row => {
    const obj = Object.keys(row).reduce((acc, key) => {
      if (!regroupFields.some(regroup => key.startsWith(`${regroup}_`)))
        acc[camelcase(key)] = row[key]
      return acc
    }, {})
    for (const field of regroupFields)
      obj[`${field}s`] = {}
    objsBySlug[obj.slug] = obj
  })

  rows.forEach(row => {
    for (const field of regroupFields) {
      const subObj = Object.keys(row).reduce((acc, key) => {
        const match = RegExp(`^${field}_(.*)`).exec(key)
        if (match)
          acc[camelcase(match[1])] = row[key]
        return acc
      }, {})
      if (Object.keys(subObj).some(key => subObj[key] !== null))
        objsBySlug[row.slug][`${field}s`][subObj.slug || subObj.reportingPeriod] = subObj
    }
  })

  for (const slug of Object.keys(objsBySlug)) {
    for (const field of regroupFields) {
      objsBySlug[slug][`${field}s`] = Object.values(objsBySlug[slug][`${field}s`])
    }
  }

  return Object.values(objsBySlug)
}

const getShips = async (orderBy) => {
  const shipsRaw = await getCollectionFromDb(`
    SELECT
      ships.*,
      companies.name as company_name,
      companies.slug as company_slug,
      routes.slug as route_slug,
      cities_a.name as route_city_a_name,
      cities_b.name as route_city_b_name,
      cities_a.country as route_city_a_country,
      cities_b.country as route_city_b_country,
      routes.distance_km as route_distance_km,
      thetis.imo as thetis_data_imo,
      thetis.reporting_period as thetis_data_reporting_period,
      thetis.computed_ecoscore_letter as thetis_data_computed_ecoscore_letter,
      thetis.annual_monitoring_co2_emissions_assigned_to_passenger_transport as thetis_data_annual_monitoring_co2_emissions_assigned_to_passenger_transport,
      thetis.annual_average_co2_emissions_per_transport_work_pax as thetis_data_annual_average_co2_emissions_per_transport_work_pax,
      thetis.annual_monitoring_co2_emissions_assigned_to_freight_transport as thetis_data_annual_monitoring_co2_emissions_assigned_to_freight_transport,
      thetis.annual_average_co2_emissions_per_transport_work_freight as thetis_data_annual_average_co2_emissions_per_transport_work_freight,
      thetis.annual_computed_ratio_co2_from_pax as thetis_data_annual_computed_ratio_co2_from_pax,
      thetis.annual_monitoring_total_co2_emissions as thetis_data_annual_monitoring_total_co2_emissions,
      thetis.annual_average_co2_emissions_per_distance as thetis_data_annual_average_co2_emissions_per_distance,
      thetis.annual_computed_distance_km as thetis_data_annual_computed_distance_km,
      thetis.annual_monitoring_total_time_spent_at_sea as thetis_data_annual_monitoring_total_time_spent_at_sea,
      thetis.annual_computed_pax as thetis_data_annual_computed_pax,
      thetis.annual_computed_freight as thetis_data_annual_computed_freight,
      thetis.annual_computed_average_speed as thetis_data_annual_computed_average_speed,
      thetis.monitoring_methods_json as thetis_data_monitoring_methods_json,
      thetis.technical_efficiency_eiv as thetis_data_technical_efficiency_eiv,
      thetis.technical_efficiency_eedi as thetis_data_technical_efficiency_eedi
    FROM ships
    LEFT JOIN companies ON ships.company_slug = companies.slug
    LEFT JOIN ships_routes ON ships.imo = ships_routes.imo
    LEFT JOIN routes ON ships_routes.route_slug = routes.slug
    LEFT JOIN cities cities_a ON routes.city_a_slug = cities_a.slug
    LEFT JOIN cities cities_b ON routes.city_b_slug = cities_b.slug
    LEFT JOIN thetis ON ships.imo = thetis.imo
    WHERE ships.out_of_scope IS false
    ORDER BY ${orderBy} ASC
  `, { regroupFields: ["route", "thetis_data"] })

  const ships = shipsRaw.map(ship => {
    ship.thetisData = ship.thetis_datas.reduce((acc, thetisRow) => {
      acc[thetisRow.reportingPeriod] = thetisRow
      return acc
    }, {})
    delete ship.thetis_datas
    return ship
  })

  return ships
}

module.exports = { getCollectionFromDb, getShips }
