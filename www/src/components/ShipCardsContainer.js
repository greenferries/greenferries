import React from 'react'
import { Box } from '@chakra-ui/core'

const ShipCardsContainer = ({ children }) => (
  <Box
    overflow='hidden'
    overflowX='scroll'
    display='flex'
    width='100%'
    flexWrap={{ md: 'wrap' }}
  >
    {children}
  </Box>
)

export default ShipCardsContainer
