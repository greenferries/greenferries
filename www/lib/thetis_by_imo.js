const { dbQueryAll, sliceRow } = require('./db_query')
const memoize = require('fast-memoize')

const getThetisByImo = async (imos) => {
  const imosSql = imos.map(imo => `'${imo}'`).join(', ')
  const thetisAll = await dbQueryAll(`SELECT * FROM thetis WHERE imo in (${imosSql})`)
  const byImo = {}
  for (const rawRow of thetisAll) {
    const row = await sliceRow(rawRow, 'thetis')
    if (!byImo[row.imo]) byImo[row.imo] = {}
    byImo[row.imo][row.reportingPeriod] = row
  }
  return byImo
}
const memoizedThetisByImo = memoize(getThetisByImo)

module.exports = { getThetisByImo: memoizedThetisByImo }
