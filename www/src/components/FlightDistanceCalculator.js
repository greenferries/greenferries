import React, { useState, useEffect } from 'react'
import { Select, Box } from '@chakra-ui/core'
import { getDistance } from 'geolib'
import flags from '../lib/flags'
import { db } from '../lib/db'

const AirportSelect = ({ country, placeholder, airport, setAirport }) => {
  const [airports, setAirports] = useState()
  const [value, setValue] = useState(airport && airport.code)
  useEffect(() => { if (airport) setValue(airport.code) }, [airport])
  useEffect(() => {
    db.airports.where('country').equals(country).sortBy('name').then(setAirports)
  }, [])
  return (
    <Select
      placeholder={placeholder}
      value={value || ''}
      onChange={event => setAirport(airports.find(a => a.code === event.currentTarget.value))}
    >
      {airports && airports.map(airport =>
        <option value={airport.code} key={airport.code}>
          {airport.name} {flags[airport.country]}
        </option>
      )}
    </Select>
  )
}

const FlightDistanceCalculator = ({ airports, setDistanceKm, route }) => {
  const [departure, setDeparture] = useState(null)
  const [arrival, setArrival] = useState(null)
  useEffect(() => {
    if (!route || !airports) return
    setDeparture(airports.find(a => a.code === route.cityA.targetAirportCode))
    setArrival(airports.find(a => a.code === route.cityB.targetAirportCode))
  }, [airports, route])
  useEffect(() => {
    if (!departure || !arrival) return
    setDistanceKm(getDistance(departure, arrival) / 1000)
  }, [departure, arrival])
  if (!airports || !setDeparture || !route) return null
  return (
    <Box>
      <Box>
        <AirportSelect
          airports={airports}
          placeholder='from'
          airport={departure}
          setAirport={setDeparture}
          country={route.cityA.country}
        />
      </Box>
      <Box textAlign='center'>
        <span role='img' aria-label='between'>↕️</span>
      </Box>
      <Box>
        <AirportSelect
          airports={airports}
          placeholder='to'
          airport={arrival}
          setAirport={setArrival}
          country={route.cityB.country}
        />
      </Box>
    </Box>
  )
}

export default FlightDistanceCalculator
