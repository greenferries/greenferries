import React from 'react'
import { Image } from '@chakra-ui/core'
import shipSilhouette from '../images/ship_icon.png'

const ShipPhoto = ({ ship, ...otherProps }) => (
  <Image
    src={ship.wikipediaThumbUrl || shipSilhouette}
    alt={`${ship.name} - source: Wikimedia`}
    title={`${ship.name} - source: Wikimedia`}
    {...otherProps}
  />
)

export default ShipPhoto
