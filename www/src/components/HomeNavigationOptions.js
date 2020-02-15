import React from 'react'
import { Link, Text, Stack } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'

const HomeNavigationOptions = ({ ships, companies }) => (
  <Stack spacing={2}>
    <Text>
      You can also:
    </Text>
    <Link as={ReactLink} to='/ships'>
      Explore all {ships && ships.length} ferries 🚢
    </Link>
    <Link as={ReactLink} to='/companies'>
      Explore all {companies && companies.length} companies 🏢
    </Link>
  </Stack>
)

export default HomeNavigationOptions
