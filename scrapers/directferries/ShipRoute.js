const mongoose = require('mongoose')

const shipRouteSchema = new mongoose.Schema({
  cityA: String,
  cityB: String,
  dateCrawled: Date,
  unavailable: Boolean,
  error: String,
  ships: Array
})

const ShipRoute = mongoose.model('ShipRoute', shipRouteSchema)

module.exports = ShipRoute
