import React from 'react'
import { Link as DefaultLink } from '@chakra-ui/core'

const Link = ({ variation = 'dark', children, ...props }) => {
  if (variation === 'dark') {
    return (
      <DefaultLink color='white' textDecoration='underline' {...props}>
        {children}
      </DefaultLink>
    )
  } else {
    return (
      <DefaultLink {...props}>
        {children}
      </DefaultLink>
    )
  }
}

export default Link
