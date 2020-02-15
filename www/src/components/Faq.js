import React from 'react'
import { Box, Text } from '@chakra-ui/core'
import ReactMarkdown from 'react-markdown'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import Link from './Link'

const FaqSection = ({ title, mdContent }) => (
  <Box marginY={3}>
    <details>
      <summary style={{ cursor: 'pointer' }}>
        <Text fontSize='lg' as='h3' fontWeight='normal' display='inline'>{title}</Text>
      </summary>
      <section><ReactMarkdown source={mdContent.toString()} /></section>
    </details>
  </Box>
)

const Faq = () => {
  const history = useHistory()
  return (
    <Box maxWidth='40rem' p={{ base: 3, md: 5 }}>
      <Link onClick={() => history.goBack()} color='#000'>
        ◀️ go back
      </Link>
      <Text as='h1'>GreenFerries FAQ</Text>
      <Box>
        <FaqSection title='Are ferries green?' mdContent='No! not by **any** means' />
        <FaqSection
          title='Why this project?'
          mdContent={`
In an effort to reduce one's carbon footprint, many people are trying to fly
as little as possible (the [flygskam](https://en.wikipedia.org/wiki/Environmental_impact_of_aviation#Personal_choices_and_social_pressure)).
Some may replace over-the-sea flights with ferry trips. However, it is very hard
to get estimates on the environmental impact of ferries. There is a huge disparity
between ships, and **it is often that case that travelling with a ferry is worse
than with a plane**.
          `}
        />
        <FaqSection
          title='Who is behind this project?'
          mdContent={`
We are a group of independent citizens (mostly french), and have no links to the transport industry nor to any government.

We are always looking for help, please reach out!(mailto:contact@greenferries.org).

Contributors:

- [Adrien Di Pasquale](https://twitter.com/hypertextadrien/): started the project and created the website
- [Clotilde Etien](http://etienclotilde.com/): designed the logo and color palette
- [Hadrien Carayol](http://www.linkedin.com/in/hadrien-carayol): helped understanding the data
- [Tanguy Colou-Mohbat](https://www.linkedin.com/in/tanguy-colou-mohbat/): helped understanding the data

**The data shown here has no official value and may be erroneous**.
          `}
        />
        <FaqSection
          title='Where does the data come from?'
          mdContent={`
The main data source is the [THETIS-MRV report](https://mrv.emsa.europa.eu/#public/eumrv).
The EU has a recent regulation that forces ships to install monitoring devices
to track their emissions of CO₂ (among other things). The data is then reported
and published as Open Data [here](https://mrv.emsa.europa.eu/#public/emission-report).
Thank you EU for that 👏

The links between ships and ferry companies and routes are manually filled by
myself from information read on [Wikipedia](https://fr.wikipedia.org/), the
companies websites and also from the [IMO](http://www.imo.org/fr/Pages/Default.aspx).

The airports data come from [ourairports.com](https://ourairports.com/data/),
and the average emission rates for the other modes of transport come from [this
article by the ADEME](https://www.ademe.fr/expertises/mobilite-transports/chiffres-cles-observations/chiffres-cles),
a french public institute for environmental matters.
          `}
        />
        <FaqSection
          title='How is the score computed?'
          mdContent='There is a dedicated [EcoScore documentation page](/ecoscore)'
        />
        <FaqSection
          title='What computations are made on the raw data?'
          mdContent='Apart from the [EcoScore](/ecoscore), we infer a few figures (total persons and freight transported, average speed etc..). You can find details about the formulas on this other [documentation page](/computed-statistics).'
        />
        <FaqSection
          title='Why is there such a tremendous impact difference between similar ships?'
          mdContent={`
Unfortunately, I have no idea. I am really looking for help to understand what
could explain these differences.

Here are our uneducated guesses so far:

- Ships that carry many cars but few people may perform much worse than ferries
that carry lots of people and few cars (GreenFerries' only concern is about
transporting people, not cargo, so we only display the 'per person' figure)
- We did not understand what the data from THETIS means.
- The monitorings are made with highly different methods from ship to ships.
- The data is erroneous (monitoring or reporting problems)
          `}
        />
        <FaqSection
          title='What to do if you encounter an error or missing data?'
          mdContent={`
Please [let me know](mailto:contact@greenferries.org) if you encounter an error
on the website. As I have manually filled data, errors are bound to happen, and
there is also a lot of data I am missing.
          `}
        />
        <FaqSection
          title='Why are there no ferry routes outside of the EU?'
          mdContent={`
The only serious datasource I could find is
[THETIS-MRV report](https://mrv.emsa.europa.eu/#public/eumrv) which concerns
only ships crusing on EU seas.

If you know about Open Data that could be used for other parts of the world,
[please let us know](mailto:contact@greenferries.org)
          `}
        />
        <FaqSection
          title='What are the approximations made?'
          mdContent={`
GreenFerries aims to allow comparisons by order of magnitudes, not by decimals.
In that idea (and because it's simpler) many shortcuts and approximations are
made:

- **NOx and SOx emissions are completely ignored** (because I could not find
reliable data about it).
- Emissions in the ports are not taken into account, only at sea (if I
understood correctly the THETIS-MRV regulation)
- distances between airports and between ports are computed as direct linear
paths (with a +5% correction measure)
- figures are rounded in various places
          `}
        />
      </Box>

      <Box marginTop={10}>
        <Link variation='light' as={ReactLink} to='/'>{'<'} Back to the homepage</Link>
      </Box>
    </Box>
  )
}

export default Faq
