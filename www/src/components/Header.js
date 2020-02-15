import React from 'react'
import logoShip from '../images/logo-ship.png'
import logoGreenferries from '../images/logo-greenferries.png'
import { Box, Image } from '@chakra-ui/core'
import Link from './Link'
import { Link as ReactLink } from 'react-router-dom'

const Header = ({ resetRoute }) => {
  return (
    <Box
      w='100%'
      boxSizing='border-box'
      overflow='hidden'
      p={{ base: 3, md: 5 }}
      height='initial'
      lineHeight='initial'
      borderBottom={{ base: '1px solid #5897ca', md: 'none' }}
    >
      <Box margin='auto' maxWidth={900}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box className='logo' display='flex' alignItems='bottom' marginRight={3}>
            <Link onClick={resetRoute}>
              <Image src={logoShip} height='50px' alt='logo' />
            </Link>
          </Box>
          <Box>
            <Link onClick={resetRoute} textDecoration='none'>
              <Image src={logoGreenferries} width='200px' />
            </Link>
          </Box>
          <Box marginLeft={5}>
            <Link as={ReactLink} to='/faq' color='black'>
              FAQ
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Header