import React from 'react'
import { Box, List, ListItem, Stack, Icon } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'
import Link from './Link'

const Footer = () => (
  <Box
    paddingX={{ base: 3, md: 5 }}
    paddingY={6}
    backgroundColor='#275167'
    color='white'
  >
    <Box margin='auto' maxWidth={900}>
      <i>
        GreenFerries is a hobby project, all the data shown here has no official value.
        It is Open Source, so you can double check and modify it.
      </i>
      <List styleType='none' p={0} spacing={2}>
        <ListItem>
          <Stack direction='row' spacing={3} flexWrap='wrap'>
            <Box>Docs:</Box>
            <Link as={ReactLink} to='/faq'>FAQ</Link>
            <Link as={ReactLink} to='/ecoscore'>EcoScore</Link>
            <Link href='https://data.greenferries.org'>
              API and dumps <Icon name='external-link' />
            </Link>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack direction='row' spacing={3} flexWrap='wrap'>
            <Box>Data Sources:</Box>
            <Link href='https://mrv.emsa.europa.eu/#public/emission-report'>
              EU 🇪🇺 Thetis-MRV Report <Icon name='external-link' />
            </Link>, &nbsp;
            <Link href='https://www.wikipedia.org/'>
              Wikipedia <Icon name='external-link' />
            </Link>
          </Stack>
        </ListItem>
        <ListItem>
          <Stack direction='row' spacing={3} flexWrap='wrap'>
            <Box>External:</Box>
            <Link href='https://github.com/greenferries/greenferries'>
              GitHub <Icon name='external-link' />
            </Link>
            <Link href='mailto:admin@greenferries.org'>Contact ✉️</Link>
            <Link href='https://riot.im/app/#/room/!ucRHvaqIzPZzjYnfTo:matrix.org?via=matrix.org'>
              Discuss with us on Riot/Matrix.org <Icon name='external-link' mx='2px' />
            </Link>
          </Stack>
        </ListItem>
        <ListItem marginTop={5}>
          <Stack direction='row' spacing={3} flexWrap='wrap'>
            <Box>Internal:</Box>
            <Link as={ReactLink} to='/sitemap'>Sitemap</Link>
            <Link as={ReactLink} to='/ships'>Explore Ferries</Link>
            <Link as={ReactLink} to='/companies'>Explore Companies</Link>
          </Stack>
        </ListItem>
      </List>
    </Box>
  </Box>
)

export default Footer
