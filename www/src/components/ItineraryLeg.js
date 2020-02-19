import React from 'react'
import { Select, Box, Link, Icon } from '@chakra-ui/core'
import transportModesgCo2PerKm from '../lib/transportModesGCo2PerKm'
import transportModesEmojis from '../lib/transportModesEmojis'

const ItineraryLeg = ({ idx, mode, distanceKm, gCo2PerPax, onUpdate, onRemove }) => {
  return (
    <Box paddingY={2} borderBottom='1px solid #ccc' display='flex' alignItems='baseline'>
      <Box display='flex' alignItems='baseline' justifyContent='space-between' flexGrow={1}>
        <Box display='flex' alignItems='center'>
          <Box marginRight={3}>{idx} {transportModesEmojis[mode]}</Box>
          <Box>
            <Select
              value={distanceKm}
              onChange={e => {
                const newDistanceKm = e.currentTarget.value
                const newGCo2PerPax = newDistanceKm * transportModesgCo2PerKm[mode]
                onUpdate({ distanceKm: { $set: newDistanceKm }, gCo2PerPax: { $set: newGCo2PerPax } })
              }}
              placeholder='distance'
            >
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(step =>
                <option key={step} value={step}>{step} km</option>
              )}
            </Select>
          </Box>
        </Box>
        <Box>
          {Math.round(gCo2PerPax / 1000)} kg
        </Box>
      </Box>
      <Box flexGrow={0} width='25px' textAlign='right'>
        <Link variant='link' onClick={onRemove}>
          <Icon name='delete' />
        </Link>
      </Box>
    </Box>
  )
}

export default ItineraryLeg
