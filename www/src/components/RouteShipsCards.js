import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import ShipCard from './ShipCard'
import ShipCardsContainer from './ShipCardsContainer'
import { useHistory } from 'react-router'
import EcoScoreExplanation from './EcoScoreExplanation'

const RouteShipsCards = ({ selectedRoute, selectedRouteShipRoutes, selectedShip, setSelectedShipRoute }) => {
  const history = useHistory()
  if (!selectedRouteShipRoutes) return null
  return (
    <Box>
      <Box p={{ base: 2, md: 0 }}>
        <Text fontSize='md' marginTop={0}>
          {selectedRouteShipRoutes &&
            <span>
              {selectedRouteShipRoutes.length === 1 &&
                'a single ship often travels on this route'}
              {selectedRouteShipRoutes.length > 1 &&
                `${selectedRouteShipRoutes.length} ships often travel on this route`}
            </span>}
        </Text>
        <ShipCardsContainer>
          {selectedRouteShipRoutes &&
            selectedRouteShipRoutes.map(shipRoute =>
              <ShipCard
                ship={shipRoute.ship}
                selected={selectedShip && shipRoute.ship.id === selectedShip.id}
                key={shipRoute.ship.id}
                onClick={() => {
                  setSelectedShipRoute(shipRoute)
                  history.push(`/ships/${shipRoute.ship.slug}?route=${selectedRoute.slug}`)
                }}
              />
            )}
        </ShipCardsContainer>
      </Box>
      <EcoScoreExplanation />
    </Box>
  )
}

export default RouteShipsCards
