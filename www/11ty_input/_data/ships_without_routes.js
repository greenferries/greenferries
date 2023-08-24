const { getCollectionFromDb } = require('../../lib')

module.exports = (async function () {
  return await getCollectionFromDb(`SELECT * FROM ships WHERE out_of_scope IS false AND unknown_routes IS true ORDER BY slug ASC`)
})()
