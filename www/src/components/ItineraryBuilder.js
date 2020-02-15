import React, { useState } from 'react'
import update from 'immutability-helper'
import { Button, Box, Divider, Heading } from '@chakra-ui/core'
import ItineraryLeg from './ItineraryLeg'

const ItineraryBuilder = ({ mainModeName, mainModeIcon, configurator, mainModeGCo2PerPax, mainModeDistanceKm, legTitle }) => {
  const [legs, setLegs] = useState([])
  const totalGCo2PerPax = mainModeGCo2PerPax + legs.reduce((p, l) => p + l.gCo2PerPax, 0)
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box flexGrow='2'>
        <Heading as='h2' my='0' size='md'>
          {mainModeIcon}
          <small>&nbsp; {legTitle || mainModeName}</small>
        </Heading>

        <Box>
          {configurator && <Box my='2'>{configurator}</Box>}
          <Box display='flex' justifyContent='space-between'>
            <div>{Math.round(mainModeDistanceKm)} km</div>
            <div>{Math.round(mainModeGCo2PerPax / 1000)} kg</div>
          </Box>
        </Box>
        {legs.map((leg, idx) => (
          <ItineraryLeg
            key={idx}
            onUpdate={updates => setLegs(update(legs, { [idx]: updates }))}
            {...leg}
          />
        ))}
        <Button
          my='2'
          size='xs'
          leftIcon='add'
          // variant='outline'
          width='100%'
          backgroundColor='white'
          onClick={() => {
            setLegs([...legs, { mode: 'car', distanceKm: 100 }])
          }}
        >
          Add a leg
        </Button>
      </Box>
      <Divider borderColor='gray.400' orientation='vertical' />
      <Box flexGrow='1'>
        <Box textAlign='center'>
          <b>Total</b>
          <Box>
            <div>
              <b>{Math.round(totalGCo2PerPax / 1000)} kg</b>
            </div>
            <small>CO₂/passenger</small>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default ItineraryBuilder
