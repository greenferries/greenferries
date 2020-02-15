import React from 'react'

const Emoji = ({ label, symbol }) => (
  <span
    role='img'
    aria-label={label || ''}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
)

export default Emoji
