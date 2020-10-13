const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbQueryAll = (query) =>
  new Promise((resolve, _reject) => {
    const dbPath = path.join(__dirname, '..', '_data', 'greenferries.db');
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY)
    db.all(query, (err, rows) => resolve(rows))
    db.close()
  })

module.exports = { dbQueryAll }
