import React from 'react'
import { Box, Text, Stack, Link } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'
import ShipPhoto from './ShipPhoto'
import EcoScore from './EcoScore'

const ShipSearchRow = ({ ship, idx }) => (
  <Link
    as={ReactLink}
    to={`/ships/${ship.slug}`}
    color='inherit'
  >
    <Box
      paddingY={2}
      borderBottom='1px solid #ccc'
      borderTop={idx === 0 ? '1px solid #ccc' : ''}
    >
      <Box display='flex' paddingX={{ base: 3, md: 5 }}>
        <ShipPhoto
          ship={ship}
          objectFit='cover'
          width='150px'
          height='80px'
          marginRight={2}
        />
        <Stack spacing={1}>
          <Text m={0} fontSize='lg' fontWeight='bold'>
            {ship.name}
          </Text>
          <Text m={0} color='gray.600'>
            {ship.company.name}
          </Text>
          <EcoScore short gCo2PerMilePax={ship.thetisAverageCo2PerPax} />
        </Stack>
      </Box>
    </Box>
  </Link>
)

export default ShipSearchRow
