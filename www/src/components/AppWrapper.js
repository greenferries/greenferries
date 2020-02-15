import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import Media from 'react-media'

import { db, dataNeedsRefresh, refreshData } from '../lib/db'

import AppRoutesDesktop from './AppRoutesDesktop'
import AppRoutesMobile from './AppRoutesMobile'

const AppWrapper = () => {
  // state - source data
  const [isLoading, setIsLoading] = useState(true)
  const [routes, setRoutes] = useState([])
  const [ships, setShips] = useState([])
  const [companies, setCompanies] = useState([])
  const [airports, setAirports] = useState([])
  const [countries, setCountries] = useState([])
  // state - user selections
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState()
  const [selectedShipRoute, setSelectedShipRoute] = useState()

  const history = useHistory()

  const resetRoute = () => {
    setSelectedRoute(null)
    setSelectedShipRoute(null)
    history.push('/select-route')
  }

  const setDataStateFromLocalDb = async () => {
    await db.ships.toArray().then(setShips)
    await db.routes.toCollection().sortBy('cityA.name').then(setRoutes)
    await db.companies.toArray().then(setCompanies)
    await db.airports.toArray().then(setAirports)
    await db.countries.toArray().then(setCountries)
  }

  const refreshIfNecessary = async () => {
    if (await dataNeedsRefresh()) {
      setIsLoading(true)
      await refreshData()
      await setDataStateFromLocalDb()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setDataStateFromLocalDb().then(() => setIsLoading(false))
    refreshIfNecessary()
  }, [])

  const shipRoutesByRouteIds = {}
  ships.forEach(ship => {
    ship.shipRoutes.forEach(shipRoute => {
      if (!shipRoutesByRouteIds[shipRoute.route.id]) shipRoutesByRouteIds[shipRoute.route.id] = []
      shipRoutesByRouteIds[shipRoute.route.id].push({ ...shipRoute, ship: ship })
    })
  })

  const selectedRouteShipRoutes = selectedRoute && shipRoutesByRouteIds[selectedRoute.id]
  const selectedCountryRoutes = selectedCountry ? (
    routes.filter(r => r.cityA.country === selectedCountry.code)
  ) : routes

  const allProps = {
    routes,
    ships,
    companies,
    airports,
    countries,
    selectedRoute,
    setSelectedRoute,
    setSelectedCountry,
    selectedCountry,
    selectedCountryRoutes,
    selectedRouteShipRoutes,
    selectedShipRoute,
    setSelectedShipRoute,
    resetRoute,
    isLoading
  }

  return (
    <Box
      w='100%'
      minHeight='100%'
      display='flex'
      flexDirection='column'
    >
      <Media query='(max-width: 48em)'>
        {screenIsSmall =>
          screenIsSmall
            ? <AppRoutesMobile {...allProps} />
            : <AppRoutesDesktop {...allProps} />}
      </Media>
    </Box>
  )
}

export default AppWrapper
