import React, { useEffect } from 'react'
import { Select, Box } from '@chakra-ui/core'
import transportModesgCo2PerKm from '../lib/transportModesgCo2PerKm'

const ItineraryLeg = ({ mode, distanceKm, gCo2PerPax, onUpdate }) => {
  useEffect(() => {
    onUpdate({ gCo2PerPax: { $set: distanceKm * transportModesgCo2PerKm[mode] } })
  }, [mode, distanceKm])
  return (
    <Box p={2} borderBottom='1px solid white' display='flex' alignItems='center' justifyContent='space-between'>
      <div>
        <Select
          value={mode}
          onChange={e => onUpdate({ mode: { $set: e.currentTarget.value } })}
        >
          <option value='car'>🚗 car</option>
          <option value='tgv'>🚅 tgv</option>
        </Select>
      </div>
      <Box display='flex' textAlign='right' whiteSpace='nowrap'>
        <Select
          value={distanceKm}
          onChange={e => onUpdate({ distanceKm: { $set: e.currentTarget.value } })}
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
