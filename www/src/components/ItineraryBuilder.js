import React, { useState } from 'react'
import update from 'immutability-helper'
import { Button, Box, Heading, Select } from '@chakra-ui/core'
import ItineraryLeg from './ItineraryLeg'
import transportModesGCo2PerKm from '../lib/transportModesGCo2PerKm'
import transportModesEmojis from '../lib/transportModesEmojis'

const ItineraryBuilder = ({ mainMode, mainModeTitle, configurator, mainModeGCo2PerPax, mainModeDistanceKm }) => {
  const [legs, setLegs] = useState([])
  const [newLegMode, setNewLegMode] = useState('car')
  const totalGCo2PerPax = mainModeGCo2PerPax + legs.reduce((p, l) => p + l.gCo2PerPax, 0)
  return (
    <Box>
      <Box>
        <Heading as='h3' margin='0' size='sm'>{mainModeTitle}</Heading>
        <Box borderBottom='1px solid #ccc' paddingY={2} paddingRight='25px' display='flex' justifyContent='space-between' alignItems='center'>
          <Box marginRight={5}>1 {transportModesEmojis[mainMode]}</Box>
          <Box flex={1}>
            <Box my='2'>{configurator}</Box>
            <Box display='flex' justifyContent='space-between'>
              <Box>{Math.round(mainModeDistanceKm)} km</Box>
              <Box>{Math.round(mainModeGCo2PerPax / 1000)} kg</Box>
            </Box>
          </Box>
        </Box>
        {legs.map((leg, idx) => (
          <ItineraryLeg
            key={idx}
            idx={idx + 2}
            onUpdate={updates => setLegs(update(legs, { [idx]: updates }))}
            {...leg}
            onRemove={() => setLegs(update(legs, { $splice: [[idx, 1]] }))}
          />
        ))}
      </Box>
      <Box textAlign='right' paddingY={2} paddingRight='25px'>
        Total: <b>{Math.round(totalGCo2PerPax / 1000)} kg</b><br />
        CO₂/passenger
      </Box>
      <Box marginTop={3} paddingRight='25px' display='flex' alignItems='center' justifyContent='space-between'>
        <Box>New leg:</Box>
        <Box>
          <Select
            value={newLegMode}
            onChange={e => setNewLegMode(e.target.value)}
          >
            {['car', 'tgv'].map(mode =>
              <option key={mode} value={mode}>{transportModesEmojis[mode]} {mode}</option>
            )}
          </Select>
        </Box>
        <Box>
          <Button
            leftIcon='add'
            width='100%'
            backgroundColor='white'
            onClick={() => {
              setLegs([...legs, { mode: newLegMode, distanceKm: 100, gCo2PerPax: 100 * transportModesGCo2PerKm[newLegMode] }])
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default ItineraryBuilder
