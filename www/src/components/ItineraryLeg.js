import React from 'react'
import { Select, Box } from '@chakra-ui/core'
import transportModesgCo2PerKm from '../lib/transportModesGCo2PerKm'

const ItineraryLeg = ({ mode, distanceKm, gCo2PerPax, onUpdate }) => {
  return (
    <Box p={2} borderBottom='1px solid white' display='flex' alignItems='center' justifyContent='space-between'>
      <div>
        <Select
          value={mode}
          onChange={e => {
            const newMode = e.currentTarget.value
            const newGCo2PerPax = distanceKm * transportModesgCo2PerKm[newMode]
            onUpdate({ mode: { $set: newMode }, gCo2PerPax: { $set: newGCo2PerPax } })
          }}
        >
          <option value='car'>🚗 car</option>
          <option value='tgv'>🚅 tgv</option>
        </Select>
      </div>
      <Box display='flex' textAlign='right' whiteSpace='nowrap'>
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
      <div>
        {Math.round(gCo2PerPax / 1000)} kg
      </div>
    </Box>
  )
}

export default ItineraryLeg
