const sqlite3 = require('sqlite3').verbose()
const open = require('sqlite').open

const camelcase = s => s.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase() })


module.exports = (async function () {
  const db = await open({
    filename: '/Users/adipasquale/dev/greenferries/datasette/dbs/greenferries.db',
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY
  })
  const rows = await db.all(`
    SELECT
      imo, reporting_period,
      computed_ecoscore_letter,
      annual_monitoring_co2_emissions_assigned_to_passenger_transport,
      annual_average_co2_emissions_per_transport_work_pax,
      annual_monitoring_co2_emissions_assigned_to_freight_transport,
      annual_average_co2_emissions_per_transport_work_freight,
      annual_computed_ratio_co2_from_pax,
      annual_monitoring_total_co2_emissions,
      annual_average_co2_emissions_per_distance,
      annual_computed_distance_km,
      annual_monitoring_total_time_spent_at_sea,
      annual_computed_pax,
      annual_computed_freight,
      annual_computed_average_speed,
      monitoring_method_a,
      monitoring_method_b,
      monitoring_method_c,
      monitoring_method_d,
      technical_efficiency_eiv,
      technical_efficiency_eedi
    FROM thetis
  `)
  db.close()
  const data = {}
  rows.forEach(row => {
    const rowCamelCase = {}
    Object.keys(row).forEach(key => {
      rowCamelCase[camelcase(key)] = row[key]
    })
    if (!data.hasOwnProperty(rowCamelCase.imo))
      data[rowCamelCase.imo] = {}
    data[rowCamelCase.imo][rowCamelCase.reportingPeriod] = rowCamelCase
  })
  // console.log(`data is loaded, its size in mb is ${JSON.stringify(data).length / 1000000}`)
  return data
})()
