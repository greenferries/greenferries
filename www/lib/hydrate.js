const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const camelcase = require('camelcase')
const memoize = require('fast-memoize')

const getColsPromise = (db, tableName) =>
  new Promise((resolve, _reject) => {
    db.all(
      `pragma table_info(${tableName})`,
      (err, rows) => resolve(rows.map(row => row.name))
    )
  })

const getTablesColumns = async () => {
  const dbPath = path.join(__dirname, '../_data/greenferries.db');
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY)
  const columnsByTable = {
    ships: await getColsPromise(db, "ships"),
    ship_routes: await getColsPromise(db, "ship_routes"),
    companies: await getColsPromise(db, "companies"),
    routes: await getColsPromise(db, "routes"),
    cities: await getColsPromise(db, "cities"),
  }
  db.close()
  return columnsByTable
}

const memoizedGetTablesColumns = memoize(getTablesColumns)

const hydrateRows = async (rows, hydrateRow) => {
  const tablesColumns = await memoizedGetTablesColumns()
  const itemsById = {}
  let initialIds = [];
  for (const row of rows) {
    if (initialIds.indexOf(row.id) == -1) initialIds.push(row.id)
    const item = await hydrateRow(row, tablesColumns)
    if (!itemsById.hasOwnProperty(item.id))
      itemsById[item.id] = item
    else if (item.hasOwnProperty("shipRoutes"))
      itemsById[item.id].shipRoutes.push(item.shipRoutes[0])
    else if (item.hasOwnProperty("ships"))
      itemsById[item.id].ships.push(item.ships[0])
  }
  return initialIds.map(id => itemsById[id])
}

const sliceRow = async (row, tableName, prefix="") => {
  const tablesColumns = await memoizedGetTablesColumns()
  return Object.fromEntries(
    tablesColumns[tableName].map(col => [camelcase(col), row[`${prefix}${col}`]])
  )
}

module.exports = { getTablesColumns: memoizedGetTablesColumns, hydrateRows, sliceRow }
