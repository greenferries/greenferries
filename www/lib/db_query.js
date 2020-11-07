const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const memoize = require('fast-memoize')
const camelcase = require('camelcase')

const dbPath = path.join(__dirname, '../../data/datasette/dbs/greenferries.db')

const dbQueryAll = (query) =>
  new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY)
    db.all(query, (_err, rows) => resolve(rows))
    db.close()
  })

const getColsPromise = (db, tableName) =>
  new Promise((resolve, reject) => {
    db.all(
      `pragma table_info(${tableName})`,
      (_err, rows) => resolve(rows.map(row => row.name))
    )
  })

const getTablesColumns = async () => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY)
  const columnsByTable = {
    thetis: await getColsPromise(db, 'thetis')
  }
  db.close()
  return columnsByTable
}

const sliceRow = async (row, tableName, prefix = '') => {
  const tablesColumns = await getTablesColumns()
  return Object.fromEntries(
    tablesColumns[tableName].map(col => [camelcase(col), row[`${prefix}${col}`]])
  )
}

const memoizedGetTablesColumns = memoize(getTablesColumns)

module.exports = { dbQueryAll, getTablesColumns: memoizedGetTablesColumns, sliceRow }
