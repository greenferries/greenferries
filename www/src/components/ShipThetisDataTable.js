import React from 'react'
import { Box, Text, Icon, Tooltip, Link, Stack, Alert, AlertIcon } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'

import smartRound from '../lib/smartRound'

const ComputedIcon = () => (
  <Tooltip cursor='pointer' label='This was computed from the raw data, cf FAQ for formulas'>
    <Icon name='info-outline' color='blue' />
  </Tooltip>
)

const FigureCell = ({ value, unit, computed = false }) => {
  if (!value) {
    return <td style={{ backgroundColor: '#eee', color: '#333' }}>N/A</td>
  }
  return (
    <td>
      {smartRound(value)} {unit} {computed ? <ComputedIcon /> : ''}
    </td>
  )
}

const ShipThetisDataTable = ({ ship }) => (
  <Stack spacing={3}>
    <Box>
      <table className='data-table'>
        <thead>
          <tr><th colSpan={4}>2018 yearly CO₂ Emissions</th></tr>
          <tr>
            <th>assigned to</th>
            <th>total</th>
            <th>average</th>
            <th>ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>persons 🙎‍♀️</th>
            <FigureCell value={ship.thetisAnnualCo2Pax} unit='tonnes CO₂' />
            <FigureCell value={ship.thetisAverageCo2PerPax} unit='g·CO₂/pax/n.mile' />
            <FigureCell value={ship.thetisAnnualComputedRatioCo2FromPax * 100} unit='%' />
          </tr>
          <tr>
            <th>freight 🚛</th>
            <FigureCell value={ship.thetisAnnualCo2Freight} unit='tonnes CO₂' />
            <FigureCell value={ship.thetisAverageCo2PerFreight} unit='kg·CO₂/m tonne/n.mile' />
            <FigureCell value={(1 - ship.thetisAnnualComputedRatioCo2FromPax) * 100} unit='%' computed />
          </tr>
          <tr>
            <th>total</th>
            <FigureCell value={ship.thetisAnnualCo2Total} unit='tonnes CO₂' />

            <FigureCell value={ship.thetisAverageCo2PerDistance} unit='kg·CO₂/n.mile' />
            {/* <br /> */}
            {/* or {Math.round(ship.thetisAverageCo2PerDistance / 1.852001)} kg·CO₂/km */}

            <td>100%</td>
          </tr>
        </tbody>
      </table>
    </Box>
    <Box>
      <table className='data-table'>
        <thead>
          <tr>
            <th colSpan={2}>2018 yearly statistics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>distance travelled</th>
            <FigureCell value={ship.thetisAnnualComputedDistanceKm} unit='km' computed />
          </tr>
          <tr>
            <th>time at sea</th>
            <FigureCell value={ship.thetisAnnualHoursAtSea} unit='hours' />
          </tr>
        </tbody>
      </table>
    </Box>
    <Box>
      <table className='data-table'>
        <thead>
          <tr>
            <th colSpan={2}>2018 average statistics per journey</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>average persons transported 🙎‍♀️</th>
            <FigureCell value={ship.thetisAnnualComputedPax} unit='persons' computed />
          </tr>
          <tr>
            <th>average freight transported 🚛</th>
            <FigureCell value={ship.thetisAnnualComputedFreight} unit='metric tonnes' computed />
          </tr>
          <tr>
            <th>average speed</th>
            <FigureCell value={ship.thetisAnnualComputedAverageSpeed} unit='km/h' computed />
          </tr>
        </tbody>
      </table>
    </Box>
    <Box>
      <Alert status='info' maxWidth='30rem'>
        <AlertIcon />
        <Box>
          <Text m={0}>
            Figures with the <Icon name='info-outline' /> icon were computed based on the published data. You can find computation details
            {' '}
            <Link as={ReactLink} to='/computed-statistics'>
              on this page
            </Link>
          </Text>
        </Box>
      </Alert>
    </Box>
  </Stack>
)

export default ShipThetisDataTable
