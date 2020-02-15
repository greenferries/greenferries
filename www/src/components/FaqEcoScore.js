import React from 'react'
import { Box } from '@chakra-ui/core'
import ReactMarkdown from 'react-markdown'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import Link from './Link'

const markdown = `
# How is the score computed?

![GreenFerries Score B](/images/score_b_150.png)

These grades are completely unofficial and subject to change. Here is
the arbitrary non-linear scale I unilaterally:

- **A**: 0-158 g·CO₂/km/person
- **B**: 158-268 g·CO₂/km/person
- **C**: 268-536 g·CO₂/km/person
- **D**: 536-1071 g·CO₂/km/person
- **E**: 1071+ g·CO₂/km/person

These bounds have been chosen to match with averages for other transport modes,
as computed by the [ADEME](https://www.ademe.fr/expertises/mobilite-transports/chiffres-cles-observations/chiffres-cles).
We therefore show these scores accompanied by a short explanation text:


- **A**: better than an average personal car
- **B**: better than an average plane
- **C**: 1 to 2 times an average plane's emissions
- **D**: 2 to 4 times an average plane's emissions
- **E**: over 4 times an average plane's emissions

You can have a look at [this notebook](https://github.com/greenferries/greenferries-data/blob/master/ecoscore.ipynb) to see the kind of computing I made to choose these
bounds so that there are still ships in all bins.

Please [reach out](mailto:contact@greenferries.org) if you think we can do
better.
`

const FaqEcoScore = () => {
  const history = useHistory()
  return (
    <Box maxWidth='40rem' p={{ base: 3, md: 5 }}>
      <Link onClick={() => history.goBack()} color='#000'>
        ◀️ go back
      </Link>
      <ReactMarkdown source={markdown} />
      <Box marginTop={10}>
        <Link variation='light' as={ReactLink} to='/'>{'<'} Back to the homepage</Link>
      </Box>
    </Box>
  )
}

export default FaqEcoScore
