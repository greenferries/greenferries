const camelcase = require('camelcase')
const { getTablesColumns } = require('./db_query')

const hydrateRows = async (rows, hydrateRow) => {
  const tablesColumns = await getTablesColumns()
  const itemsById = {}
  const initialIds = []
  for (const row of rows) {
    if (initialIds.indexOf(row.id) === -1) initialIds.push(row.id)
    const item = await hydrateRow(row, tablesColumns)
    if (itemsById[item.id] === undefined) itemsById[item.id] = item
    else {
      if (item.shipRoutes && item.shipRoutes.length > 0) { itemsById[item.id].shipRoutes.push(item.shipRoutes[0]) }
      if (item.ships && item.ships.length > 0) { itemsById[item.id].ships.push(item.ships[0]) }
      if (item.thetis && item.thetis !== null) { Object.assign(itemsById[item.id].thetis, item.thetis) }
    }
  }
  return initialIds.map(id => itemsById[id])
}

const sliceRow = async (row, tableName, prefix = '') => {
  const tablesColumns = await getTablesColumns()
  return Object.fromEntries(
    tablesColumns[tableName].map(col => [camelcase(col), row[`${prefix}${col}`]])
  )
}

module.exports = { hydrateRows, sliceRow }
