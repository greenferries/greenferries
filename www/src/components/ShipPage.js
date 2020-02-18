import React, { useEffect } from 'react'
import { Box, Stack, Text, Spinner, Link, Icon, Alert, AlertIcon } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'
import { useParams, useHistory, useLocation } from 'react-router'

import ShipPhoto from './ShipPhoto'
import EcoScore from './EcoScore'
import ShipThetisDataTable from './ShipThetisDataTable'

const ShipPage = ({ ships, selectedShipRoute, setSelectedShipRoute, setSelectedRoute }) => {
  const history = useHistory()
  const location = useLocation()
  const { shipSlug: slugFromParams } = useParams()
  const ship = ships.find(s => s.slug === slugFromParams)

  useEffect(() => {
    if (selectedShipRoute || !ship) return
    const query = new URLSearchParams(location.search)
    const routeSlugFromQuery = query.get('route')
    if (!routeSlugFromQuery) return
    const foundShipRoute = ship.shipRoutes.find(sr => sr.route.slug === routeSlugFromQuery)
    if (!foundShipRoute) return
    setSelectedShipRoute(foundShipRoute)
    setSelectedRoute(foundShipRoute.route)
  }, [location, ship])

  if (ships.length === 0 || !selectedShipRoute) {
    return <Box paddingY={20} textAlign='center'><Spinner /></Box>
  }

  if (!ship) {
    return (
      <Box paddingY={20} textAlign='center'>
        No ship found for '{slugFromParams}' 😭
      </Box>
    )
  }

  return (
    <>
      <Box p={{ base: 3, md: 5 }}>
        <Link onClick={() => history.goBack()}>
        ◀️ go back
        </Link>
        <Text as='h1' fontSize='xl' fontWeight='bold'>
          {ship.name}
        </Text>
        <Box display='flex' flexWrap='wrap'>
          <Box marginRight={5} marginBottom={2}>
            <ShipPhoto
              ship={ship}
              objectFit='cover'
              width='300px'
              maxWidth='100%'
            />
          </Box>
          <Box>
            <Stack spacing={2} marginBottom={4}>
              <Box>
                <EcoScore gCo2PerMilePax={ship.thetisAverageCo2PerPax} />
              </Box>
              {selectedShipRoute &&
                <Stack spacing={2}>
                  <Box>
                    <b>{Math.round(selectedShipRoute.gCo2PerPax / 1000)} kg·CO₂/passenger</b>
                    {' '}
                    will be emitted when travelling on this ship from
                    {' '}
                    {selectedShipRoute.route.cityA.name} to {selectedShipRoute.route.cityB.name}
                  </Box>
                  <Box>
                    <Link as={ReactLink} to={`/itineraries-comparator?route=${selectedShipRoute.route.slug}&ship=${selectedShipRoute.ship.slug}`}>
                      Compare with flying ✈️
                    </Link>
                  </Box>
                </Stack>}
            </Stack>
            <Stack spacing={1}>
              <Text m={0}>
                Operator:{' '}
                <Link as={ReactLink} to={`/companies/${ship.company.slug}`}>
                  {ship.company.name}
                </Link>
              </Text>
              {ship.capacityPax &&
                <Text m={0}>
                  Capacity: {ship.capacityPax} persons
                </Text>}
              <Text m={0}>
                IMO Number: {ship.imo}
              </Text>
              {ship.wikipediaUrl &&
                <Link isExternal href={ship.wikipediaUrl} marginTop={5}>
                  Wikipedia ship page <Icon name='external-link' />
                </Link>}
            </Stack>
          </Box>
        </Box>
        <Box>
          <Text as='h3'>
            {ship.shipRoutes.length === 0 &&
              <>Unknown frequent routes</>}
            {ship.shipRoutes.length === 1 &&
              <>Frequently travels on a single route</>}
            {ship.shipRoutes.length > 1 &&
              <>Frequently travels on {ship.shipRoutes.length} routes</>}
          </Text>
          <ul>
            {ship.shipRoutes.map(shipRoute =>
              <li key={shipRoute.route.slug}>
                <Link to={`/routes/${shipRoute.route.slug}`} as={ReactLink}>
                  {shipRoute.route.cityA.name} [{shipRoute.route.cityA.country}] - {shipRoute.route.cityB.name} [{shipRoute.route.cityB.country}]
                </Link>
                {' '}
                ({shipRoute.route.distanceKm} km)
              </li>
            )}
          </ul>
        </Box>
      </Box>
      <Box p={{ base: 0, md: 5 }}>
        <ShipThetisDataTable ship={ship} />
      </Box>
      <Box p={{ base: 3, md: 5 }}>
        <Alert status='warning' maxWidth='30rem'>
          <AlertIcon />
          <Box>
            <Text m={0}>
              Do you know of a route that this ship frequently travels but is not listed? Or have you noticed an error?
            </Text>
            <Text marginTop={1} marginBottom={0}>
              Please help by
              {' '}
              <a href='mailto:contact@greenferries.org'>
                letting us know
              </a>, thank you 🙇🏽‍♀️
            </Text>
          </Box>
        </Alert>
      </Box>
    </>
  )
}

export default ShipPage
