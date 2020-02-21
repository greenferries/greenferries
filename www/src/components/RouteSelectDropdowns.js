import React from 'react'
import { Select, Box, Text, Spinner, Button } from '@chakra-ui/core'
import { useHistory } from 'react-router'

const RouteSelectDropdowns = ({
  routes, selectedRoute, setSelectedRoute, resetRoute,
  countries, selectedCountry, setSelectedCountry,
  selectedCountryRoutes, isLoading
}) => {
  const history = useHistory()

  const countriesWithCount = countries && routes && countries.map(
    c => ({ routesCount: routes.filter(r => r.cityA.country === c.code).length, ...c })
  ).filter(c => c.routesCount > 0)

  const selects = (
    <>
      <label>
        <Text fontWeight='bold' marginBottom={1}>
          Departure Country
        </Text>
      </label>
      <Select
        maxWidth={500}
        placeholder=' '
        onChange={event => {
          resetRoute()
          setSelectedCountry(countries.find(c => c.code === event.currentTarget.value))
        }}
        value={selectedCountry ? selectedCountry.code : ''}
      >
        {countriesWithCount && countriesWithCount.map(country =>
          <option value={country.code} key={country.code}>
            {country.name} ({country.routesCount} routes)
          </option>
        )}
      </Select>

      <label>
        <Text fontWeight='bold' marginBottom={1}>
          Ferry Route
        </Text>
      </label>
      <Select
        maxWidth={500}
        placeholder=' '
        onChange={event => {
          const routeSlug = event.currentTarget.value
          setSelectedRoute(selectedCountryRoutes.find(r => r.slug === routeSlug))
          history.push(`/routes/${routeSlug}`)
        }}
        value={selectedRoute ? selectedRoute.slug : ''}
      >
        {selectedCountryRoutes.map(route => (
          <option value={route.slug} key={route.slug}>
            {route.cityA.name}&nbsp;
            ↔️&nbsp;
            {route.cityB.name} [{route.cityB.country}]
          </option>
        ))}
      </Select>
      {!selectedRoute &&
        <Box marginTop={5}>
          <Button backgroundColor='#5897ca' color='white' border={0} cursor='pointer'>Compare Ferries</Button>
        </Box>}
      {selectedRoute &&
        <span>&nbsp;{selectedRoute.distanceKm} km</span>}
    </>
  )

  return (
    <Box paddingX={{ base: 3, md: 0 }} marginBottom={3}>
      <Text as='h2' fontWeight={700} fontSize={{ base: '2xl', md: '4xl' }}>
        Find ferries that emit
        {' '}
        <Text m={0} display='inline' color='#5897ca'>less CO₂ than planes</Text>
        {' '}
        (per person and km)
      </Text>

      {isLoading && <Box textAlign='center'><Spinner /></Box>}
      {!isLoading && selects}
    </Box>
  )
}

export default RouteSelectDropdowns
