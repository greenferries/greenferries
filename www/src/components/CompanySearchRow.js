import React from 'react'
import { Box, Text, Stack, Link, Image } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'

const CompanySearchRow = ({ company, idx }) => (
  <Link
    as={ReactLink}
    to={`/companies/${company.slug}`}
    color='inherit'
  >
    <Box
      paddingY={2}
      borderBottom='1px solid #ccc'
      borderTop={idx === 0 ? '1px solid #ccc' : ''}
    >
      <Box display='flex' paddingX={{ base: 3, md: 5 }}>
        <Image
          src={company.logoUrl}
          objectFit='contain'
          width='150px'
          height='80px'
          marginRight={2}
        />
        <Stack spacing={1}>
          <Text m={0} fontSize='lg' fontWeight='bold'>
            {company.name}
          </Text>
          <Text m={0} color='gray.600'>
            {company.shipsCount} ferries
          </Text>
        </Stack>
      </Box>
    </Box>
  </Link>
)

export default CompanySearchRow
