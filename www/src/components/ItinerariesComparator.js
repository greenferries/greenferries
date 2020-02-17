import React, { useState, useEffect } from 'react'
import FlightDistanceCalculator from './FlightDistanceCalculator'
import { Box, Divider, Text } from '@chakra-ui/core'
import ItineraryBuilder from './ItineraryBuilder'
import transportModesgCo2PerKm from '../lib/transportModesGCo2PerKm'
import { useLocation } from 'react-router'

const ItinerariesComparator = ({ ships, airports, selectedRoute, selectedShipRoute, setSelectedShipRoute, setSelectedRoute }) => {
  const [planeDistanceKm, setPlaneDistanceKm] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (selectedShipRoute || !ships) return
    const query = new URLSearchParams(location.search)
    const shipSlugFromQuery = query.get('ship')
    if (!shipSlugFromQuery) return
    const ship = ships.find(s => s.slug === shipSlugFromQuery)
    if (!ship) return
    const routeSlugFromQuery = query.get('route')
    if (!routeSlugFromQuery) return
    const foundShipRoute = ship.shipRoutes.find(sr => sr.route.slug === routeSlugFromQuery)
    if (!foundShipRoute) return
    setSelectedShipRoute(foundShipRoute)
    setSelectedRoute(foundShipRoute.route)
  }, [location, ships])

  if (!selectedRoute || !(selectedShipRoute)) return null

  return (
    <Box p={{ base: 3, md: 5 }}>
      <Text as='h3'>Compare plane and ferry travel on this route</Text>
      <Box display='flex'>
        <Box
          flexGrow={1}
          flexBasis={0}
          p='4'
          borderRadius='lg'
        >
          <ItineraryBuilder
            mainModeName='ferry'
            legTitle={`${selectedRoute.cityA.name} ↔ ${selectedRoute.cityB.name}`}
            mainModeIcon='🚢'
            mainModeGCo2PerPax={selectedShipRoute.gCo2PerPax}
            mainModeDistanceKm={selectedRoute.distanceKm}
          />
        </Box>
        <Divider orientation='vertical' borderColor='gray.200' />

        <Box
          flexGrow={1}
          flexBasis={0}
          p='4'
          borderRadius='lg'
        >
          <ItineraryBuilder
            mainModeName='plane'
            mainModeIcon='✈️'
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
