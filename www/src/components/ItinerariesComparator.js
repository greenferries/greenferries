import React, { useState } from 'react'
import FlightDistanceCalculator from './FlightDistanceCalculator'
import { Box, Divider } from '@chakra-ui/core'
import ItineraryBuilder from './ItineraryBuilder'
import transportModesgCo2PerKm from '../lib/transportModesgCo2PerKm'

const ItinerariesComparator = ({ airports, selectedRoute, selectedShipRoute }) => {
  const [planeDistanceKm, setPlaneDistanceKm] = useState(null)
  const distanceKm = selectedRoute.distanceKm
  return (
    <section>
      <h3>Compare plane and ferry travel on this route</h3>
      <Box display='flex'>
        <Box
          flexGrow={1}
          flexBasis={0}
          backgroundColor='gray.100'
          p='4'
          borderRadius='lg'
        >
          <ItineraryBuilder
            mainModeName='ferry'
            legTitle={`ferry ${selectedRoute.cityA.name} ↔ ${selectedRoute.cityB.name}`}
            mainModeIcon='🚢'
            mainModeGCo2PerPax={selectedShipRoute.gCo2PerPax}
            mainModeDistanceKm={distanceKm}
          />
        </Box>
        <Divider orientation='vertical' borderColor='gray.200' />

        <Box
          flexGrow={1}
          flexBasis={0}
          backgroundColor='gray.100'
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
    </section>
  )
}

export default ItinerariesComparator
