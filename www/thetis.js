const sqlite3 = require('sqlite3').verbose()
const open = require('sqlite').open

const camelcase = s => s.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase() })


module.exports = (async function () {
  const db = await open({
    filename: `${__dirname}/../dbs/www.db`,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY
  })
  const rows = await db.all(`SELECT * FROM thetis`)
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
  return data
})()
