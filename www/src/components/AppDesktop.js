import React, { useState, lazy, Suspense } from 'react'
import { Box, Divider, Text } from '@chakra-ui/core'

import RouteSelectDropdowns from './RouteSelectDropdowns'
import RouteShipsCards from './RouteShipsCards'
import HomeNavigationOptions from './HomeNavigationOptions'

import MapImage from '../images/map.png'

const RouteSelectMap = lazy(() => import('./RouteSelectMap'))

const AppDesktop = (allProps) => {
  const [visibleMap, setVisibleMap] = useState(window.sessionStorage.getItem('visible-map'))
  const { selectedRoute, ships, companies } = allProps

  const doSetVisibleMap = () => {
    window.sessionStorage.setItem('visible-map', true)
    setVisibleMap(true)
  }
  return (
    <Box display='flex' overflow='hidden' p={{ base: 3, md: 5 }}>
      <Box marginRight={5} overflow='hidden'>
        <RouteSelectDropdowns {...allProps} />
        {selectedRoute && <RouteShipsCards {...allProps} />}
        {!selectedRoute &&
          <Box marginTop={10}>
            <Divider marginBottom={5} />
            <HomeNavigationOptions ships={ships} companies={companies} />
          </Box>}
      </Box>
      <Box
        display={{ base: 'none', md: 'initial' }}
        width='400px'
      >
        {visibleMap &&
          <Suspense fallback={<div>Loading...</div>}>
            <RouteSelectMap {...allProps} />
          </Suspense>}
        {!visibleMap &&
          <Box
            display='flex'
            flexDirection='row'
            height='100%'
            width={400}
            alignItems='center'
            justifyContent='space-around'
            backgroundImage={`url(${MapImage})`}
            backgroundSize='cover'
            className='inactive-map'
            cursor='pointer'
            onClick={() => doSetVisibleMap()}
          >
            <Box
              textAlign='center'
              backgroundColor='rgba(255,255,255,0.8)'
              p={5}
              borderRadius={5}
              maxWidth='80%'
              display='none'
              className='inactive-map-overlay'
            >
              <Text>Click to load the map</Text>
              <Text>(it's not loaded by default as it uses a lot of bandwidth)</Text>
            </Box>
          </Box>}
      </Box>
    </Box>
  )
}

export default AppDesktop
