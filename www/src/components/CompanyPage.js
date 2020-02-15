import React from 'react'
import { Box, Text, Spinner, Link, Icon, Alert, Image, AlertIcon, Stack } from '@chakra-ui/core'
import { useParams, useHistory } from 'react-router'
import ShipCardsContainer from './ShipCardsContainer'
import ShipCard from './ShipCard'

const CompanyPage = ({ companies }) => {
  const { companySlug: slugFromParams } = useParams()
  const history = useHistory()

  if (companies.length === 0) {
    return <Box paddingY={20} textAlign='center'><Spinner /></Box>
  }

  const company = companies.find(s => s.slug === slugFromParams)
  if (!company) {
    return (
      <Box paddingY={20} textAlign='center'>
          No company found for '{slugFromParams}' 😭
      </Box>
    )
  }

  return (
    <Box p={{ base: 3, md: 5 }}>
      <Link onClick={() => history.goBack()}>
       ◀️ go back
      </Link>
      <Text as='h1' fontSize='xl' fontWeight='bold'>
        {company.name}
      </Text>
      <Stack spacing={2}>
        <Box>
          <Image src={company.logoUrl} maxWidth='200px' />
        </Box>
        {company.imo &&
          <Text m={0}>
            IMO Number: {company.imo}
          </Text>}
        {company.wikipediaUrl &&
          <Link isExternal href={company.wikipediaUrl} marginTop={5}>
            Wikipedia company page <Icon name='external-link' />
          </Link>}
      </Stack>
      <Text as='h3'>
        {company.ships.length === 0 &&
          <>Operates no known ferries</>}
        {company.ships.length === 1 &&
          <>Operates a single known ferry</>}
        {company.ships.length > 1 &&
          <>Operates {company.ships.length} ferries</>}
      </Text>
      <Box marginBottom={5}>
        <ShipCardsContainer>
          {company.ships.map(ship =>
            <ShipCard
              key={ship.id}
              ship={ship}
              onClick={() => { history.push(`/ships/${ship.slug}`) }}
            />
          )}
        </ShipCardsContainer>
      </Box>

      <Alert status='warning' maxWidth='30rem'>
        <AlertIcon />
        <Box>
          <Text m={0}>
            Do you know of a ship that this company operates but is not listed? Or have you noticed an error?
          </Text>
          <Text marginTop={1} marginBottom={0}>
            Please help by
            {' '}
            <a href='mailto:contact@greenferries.org'>
              letting us know
            </a>, thank you 🙇🏽‍♀️
          </Text>
        </Box>
      </Alert>
    </Box>
  )
}

export default CompanyPage
