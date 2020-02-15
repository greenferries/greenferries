import React from 'react'
import { Box, Divider } from '@chakra-ui/core'
import EcoScore from './EcoScore'
import ShipPhoto from './ShipPhoto'

const ShipCard = ({ selected, onClick, ship }) => (
  <Box
    borderWidth='1px'
    rounded='lg'
    overflow='hidden'
    border='1px solid'
    borderColor='gray.200'
    backgroundColor={selected ? 'blue.100' : ''}
    cursor='pointer'
    width={{ base: '150px', md: '200px' }}
    flexShrink={0}
    marginRight={2}
    marginTop={{ base: 0, md: 3 }}
    onClick={onClick}
  >
    <ShipPhoto
      ship={ship}
      objectFit='cover'
      width='100%'
      height='80px'
      display='block'
    />
    <Box paddingY='2' paddingX='2'>
      <Box
        mt='2'
        mb='0'
        fontWeight='semibold'
        as='h4'
        isTruncated
      >
        {ship.name}
      </Box>
      <Box color='gray.500' fontSize='xs' isTruncated>
        {ship.company.name}
      </Box>
      <Divider borderColor='gray.200' />
      <EcoScore short gCo2PerMilePax={ship.thetisAverageCo2PerPax} />
    </Box>
  </Box>
)

export default ShipCard
