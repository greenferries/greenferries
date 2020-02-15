import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import Link from './Link'

const Ship = ({ ship }) => (
  <li>
    <Box>
      🚢 Ship
      {' '}
      <Link as={ReactLink} to={`/ships/${ship.slug}`} color='#000'>
        {ship.name}
      </Link>
    </Box>
  </li>
)

const Company = ({ company }) => (
  <li>
    <Box marginBottom={5}>
      🏢 Company
      {' '}
      <Link as={ReactLink} to={`/companies/${company.slug}`} color='#000'>
        {company.name}
      </Link>
      <Box marginLeft={5} marginTop={2}>
        <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
          {company.ships.map(s => <Ship key={s.id} ship={s} />)}
        </ul>
      </Box>
    </Box>
  </li>
)

const Route = ({ route }) => (
  <li>
    <Box>
      🔃 Route
      {' '}
      <Link as={ReactLink} to={`/routes/${route.slug}`} color='#000'>
        {route.cityA.name} - {route.cityB.name} [{route.cityB.country}]
      </Link>
    </Box>
  </li>
)

const Country = ({ country }) => (
  <li>
    <Box marginBottom={5}>
      🌎 Country {country.code}
      {' '}
      <Box marginLeft={5} marginTop={2}>
        <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
          {country.routes.map(r => <Route key={r.id} route={r} />)}
        </ul>
      </Box>
    </Box>
  </li>
)

const SitemapPage = ({ companies, ships, routes }) => {
  const history = useHistory()
  const routesByCountries = {}
  routes.forEach(route => {
    if (!Object.keys(routesByCountries).includes(route.cityA.country)) {
      routesByCountries[route.cityA.country] = []
    }
    routesByCountries[route.cityA.country].push(route)
  })
  const countries = Object.keys(routesByCountries).map(countryCode => ({
    code: countryCode, routes: routesByCountries[countryCode]
  }))
  return (
    <Box maxWidth='40rem' p={{ base: 3, md: 5 }}>
      <Link onClick={() => history.goBack()} color='#000'>
        ◀️ go back
      </Link>
      <Box>
        <Text as='h1'>
          Sitemap
        </Text>
        <Text as='h2'>
          All {companies.length} companies and {ships.length} ferries:
        </Text>
        <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
          {companies.map(c => <Company key={c.id} company={c} />)}
        </ul>
        <Text as='h2'>
          All routes by countries:
        </Text>
        <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
          {countries.map(c => <Country key={c.code} country={c} />)}
        </ul>
      </Box>
      <Box marginTop={10}>
        <Link variation='light' as={ReactLink} to='/'>{'<'} Back to the homepage</Link>
      </Box>
    </Box>
  )
}

export default SitemapPage
