import React from 'react'
import { Box, Text, Icon, Tooltip, Link, Stack } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'

import smartRound from '../lib/smartRound'

const ComputedIcon = () => (
  <Tooltip cursor='pointer' label='This was computed from the raw data, cf FAQ for formulas'>
    <Icon name='info-outline' />
  </Tooltip>
)

const ShipThetisDataTable = ({ ship }) => (
  <Stack spacing={3}>
    <Box>
      <Text as='h3' paddingX={{ base: 3, md: 0 }}>THETIS Statistics:</Text>
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
            <td>{smartRound(ship.thetisAnnualCo2Pax)} tonnes CO₂</td>
            <td>{smartRound(ship.thetisAverageCo2PerPax)} g·CO₂/pax/n.mile</td>
            <td>{smartRound(ship.thetisAnnualComputedRatioCo2FromPax * 100)}% <ComputedIcon /></td>
          </tr>
          <tr>
            <th>freight 🚛</th>
            <td>{smartRound(ship.thetisAnnualCo2Freight)} tonnes CO₂</td>
            <td>{smartRound(ship.thetisAverageCo2PerFreight)} kg·CO₂/m tonne/n.mile</td>
            <td>{smartRound((1 - ship.thetisAnnualComputedRatioCo2FromPax) * 100)}% <ComputedIcon /></td>
          </tr>
          <tr>
            <th>total</th>
            <td>{smartRound(ship.thetisAnnualCo2Total)} tonnes CO₂</td>
            <td>
              {smartRound(ship.thetisAverageCo2PerDistance)} kg·CO₂/n.mile<br />
              {/* or {Math.round(ship.thetisAverageCo2PerDistance / 1.852001)} kg·CO₂/km */}
            </td>
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
            <th>persons 🙎‍♀️</th>
            <td>{smartRound(ship.thetisAnnualComputedPax)} persons transported <ComputedIcon /></td>
          </tr>
          <tr>
            <th>freight 🚛</th>
            <td>{smartRound(ship.thetisAnnualComputedFreight)} metric tonnes transported <ComputedIcon /></td>
          </tr>
          <tr>
            <th>distance travelled</th>
            <td>{smartRound(ship.thetisAnnualComputedDistanceKm)} km <ComputedIcon /></td>
          </tr>
          <tr>
            <th>time at sea</th>
            <td>{smartRound(ship.thetisAnnualHoursAtSea)} hours</td>
          </tr>
          <tr>
            <th>average speed</th>
            <td>{smartRound(ship.thetisAnnualComputedAverageSpeed)} km/h <ComputedIcon /></td>
          </tr>
        </tbody>
      </table>
    </Box>
    <Box paddingX={{ base: 3, md: 0 }}>
      Figures with the <Icon name='info-outline' /> icon were computed based on the published data. You can find computation details
      {' '}
      <Link as={ReactLink} to='/computed-statistics'>
        on this page
      </Link>
    </Box>
  </Stack>
)

export default ShipThetisDataTable
