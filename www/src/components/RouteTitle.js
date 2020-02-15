import React from 'react'
import { useHistory } from 'react-router'
import { Box, Button } from '@chakra-ui/core'

const RouteTitle = ({ selectedRoute, setSelectedRoute, setSelectedShipRoute }) => {
  const history = useHistory()

  if (!selectedRoute) return null
  return (
    <Box
      p={3}
      borderBottom='1px solid #ccc'
      backgroundColor='#eee'
      alignItems='baseline'
    >
      <Box
        display='flex'
        flexWrap='wrap'
        whiteSpace='nowrap'
        overflow='hidden'
      >
        <Box marginRight={2} marginTop={1} fontWeight='bold'>Current Route:</Box>
        <Box
          display='flex'
          flexDirection='row'
          marginRight={2}
          marginTop={1}
          maxWidth='100%'
        >
          <Box whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {selectedRoute.cityA.name} [{selectedRoute.cityA.country}]
          </Box>
          <Box textAlign='center' marginLeft={1}>↔️</Box>
          <Box
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
            marginLeft={1}
          >
            {selectedRoute.cityB.name} [{selectedRoute.cityB.country}]
          </Box>
        </Box>
        <Box marginRight={2} marginTop={1}>({selectedRoute.distanceKm} km)</Box>
        <Box marginTop={1}>
          <Button
            variant='link'
            border={0}
            m={0}
            p={0}
            backgroundColor='transparent'
            color='green.500'
            cursor='pointer'
            onClick={() => {
              setSelectedRoute(null)
              setSelectedShipRoute(null)
              history.push('/select-route')
            }}
          >
            Change Route
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RouteTitle
