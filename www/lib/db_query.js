const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const memoize = require('fast-memoize')

const dbPath = path.join(__dirname, '../../data/datasette/dbs/greenferries.db')

const dbQueryAll = (query) =>
  new Promise((resolve, _reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY)
    db.all(query, (err, rows) => resolve(rows))
    db.close()
  })

const getColsPromise = (db, tableName) =>
  new Promise((resolve, _reject) => {
    db.all(
      `pragma table_info(${tableName})`,
      (err, rows) => resolve(rows.map(row => row.name))
    )
  })

const getTablesColumns = async () => {
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


module.exports = { dbQueryAll, getTablesColumns: memoizedGetTablesColumns }
