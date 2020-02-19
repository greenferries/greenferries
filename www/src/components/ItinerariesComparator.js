import React, { useState, useEffect } from 'react'
import FlightDistanceCalculator from './FlightDistanceCalculator'
import { Box, Divider, Text } from '@chakra-ui/core'
import ItineraryBuilder from './ItineraryBuilder'
import transportModesgCo2PerKm from '../lib/transportModesGCo2PerKm'
import { useLocation } from 'react-router'

const ItinerariesComparator = ({
  ships,
  airports,
  selectedRoute,
  selectedShipRoute,
  setSelectedShipRoute,
  setSelectedRoute,
  selectedShip,
  setSelectedShip
}) => {
  const [planeDistanceKm, setPlaneDistanceKm] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (selectedShip || !ships) return
    const query = new URLSearchParams(location.search)
    const shipSlugFromQuery = query.get('ship')
    if (!shipSlugFromQuery) return
    const ship = ships.find(s => s.slug === shipSlugFromQuery)
    if (!ship) return
    setSelectedShip(ship)
  }, [location, ships])

  useEffect(() => {
    if (!selectedShip) return
    const query = new URLSearchParams(location.search)
    const routeSlugFromQuery = query.get('route')
    if (!routeSlugFromQuery) return
    const foundShipRoute = selectedShip.shipRoutes.find(sr => sr.route.slug === routeSlugFromQuery)
    if (!foundShipRoute) return
    setSelectedShipRoute(foundShipRoute)
    setSelectedRoute(foundShipRoute.route)
  }, [location, selectedShip])

  if (!selectedRoute || !(selectedShipRoute)) return null

  return (
    <Box p={{ base: 3, md: 5 }}>
      <Text as='h3'>Itineraries comparator</Text>
      <Box display='flex' flexDirection={{ base: 'column', md: 'row' }}>
        <Box
          flexGrow={1}
          flexBasis={0}
          p={{ base: 0, md: 4 }}
          borderRadius='lg'
        >
          <ItineraryBuilder
            mainMode='ferry'
            mainModeTitle='With the ferry 🚢'
            configurator={`${selectedRoute.cityA.name} ↔ ${selectedRoute.cityB.name}`}
            mainModeGCo2PerPax={selectedShipRoute.gCo2PerPax}
            mainModeDistanceKm={selectedRoute.distanceKm}
          />
        </Box>
        <Box paddingY={{ base: 10, md: 0 }}>
          <Divider
            orientation={{ base: 'horizontal', md: 'vertical' }}
            borderColor='gray.200'
          />
        </Box>
        <Box
          flexGrow={1}
          flexBasis={0}
          p={{ base: 0, md: 4 }}
          borderRadius='lg'
        >
          <ItineraryBuilder
            mainMode='plane'
            mainModeTitle='With the plane ✈️'
            configurator={
              <FlightDistanceCalculator
                airports={airports}
                setDistanceKm={setPlaneDistanceKm}
                route={selectedRoute}
              />
            }
            mainModeGCo2PerPax={planeDistanceKm * transportModesgCo2PerKm.plane}
            mainModeDistanceKm={planeDistanceKm}
          />
        </Box>
      </Box>

      <small>
        Source{' '}
        <a href='https://www.ademe.fr/expertises/mobilite-transports/chiffres-cles-observations/chiffres-cles'>
          Ademe
        </a>
      </small>
    </Box>
  )
}

export default ItinerariesComparator
