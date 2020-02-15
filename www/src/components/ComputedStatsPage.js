import React from 'react'
import { Box } from '@chakra-ui/core'
import ReactMarkdown from 'react-markdown'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import Link from './Link'

const markdown = `
# Computations for annual statistics

## Raw data published on THETIS

You can find the published data on [THETIS publicly accessible platform](https://mrv.emsa.europa.eu/#public/emission-report).

![](/images/thetis-stats-1.png)

![](/images/thetis-stats-2.png)

### Distance travelled

\`TotDst = TotCO₂ / AvgCO₂Pax\`

*ie.* total emitted CO₂ / average CO₂ emitted per distance

*eg.* for the [Sea Wind](/ships/m-s-sea-wind-7128332) ship in the picture:

\`(12912.35 m tonnes * 1000) / (265.00 kg CO₂ / n mile) ~= 48725 n miles ~= 90239 km\`

### Persons transported

\`TotPax = TotCO₂Pax / (AvgCO₂PaxDst * TotDst)\`

*ie.* total emitted CO₂ assigned to persons transport / (average CO₂ emitted per distance per person * distance)

*eg.* for the [Sea Wind](/ships/m-s-sea-wind-7128332) ship in the picture:

\`(3085.35 m tonnes * 1000) / ((1873.44
  g CO₂ / pax · n miles / 1000) * 48725 n miles) ~= 34 persons\`

### Freight transported

\`TotFrt = TotCO₂Frt / (AvgCO₂FrtDst * TotDst)\`

*ie.* total emitted CO₂ assigned to freight transport / (average CO₂ emitted per metric ton of freight * distance)

*eg.* for the [Sea Wind](/ships/m-s-sea-wind-7128332) ship in the picture:

\`9157.98 m tonnes * 1000 / ((172.77 g CO₂ / m tonnes · n miles / 1000) * 48725 n miles) ~= 1088 m tonnes\`

### Average speed

\`AvgSpd = TotDst / H\`

*ie.* distance travelled / hours at sea

*eg.* for the [Sea Wind](/ships/m-s-sea-wind-7128332) ship in the picture:

\`90239 km / 3787.00 hours ~= 24 km/h \`

### Ratio of emitted CO₂ assigned to passengers

\`RatCO₂Pax = TotCO₂Pax / TotCO₂\`

*ie.* total emitted CO₂ assigned to persons transport / total emitted CO₂

*eg.* for the [Sea Wind](/ships/m-s-sea-wind-7128332) ship in the picture:

\`3085.35 m tonnes / 12912.35 m tonnes ~= 24%\`

# Code

If you want up-to-date and detailed formulas applied to compute the figures, please refer to [the code on GitHub](https://github.com/greenferries/greenferries-admin). The [ship.rb model file](https://github.com/greenferries/greenferries-admin/blob/master/app/models/ship.rb#L29) contains the important computations
`

const ComputedStatsPage = () => {
  const history = useHistory()
  return (
    <Box maxWidth='40rem' p={{ base: 3, md: 5 }}>
      <Link onClick={() => history.goBack()} color='#000'>
        ◀️ go back
      </Link>
      <Box className='docs-markdown'>
        <ReactMarkdown source={markdown} />
      </Box>
      <Box marginTop={10}>
        <Link variation='light' as={ReactLink} to='/'>{'<'} Back to the homepage</Link>
      </Box>
    </Box>
  )
}

export default ComputedStatsPage
