import React from 'react'
import { Box, Image, Text, Link, Icon, Stack } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'
import ImgFullA from '../images/score_a_150.png'
import ImgFullB from '../images/score_b_150.png'
import ImgFullC from '../images/score_c_150.png'
import ImgFullD from '../images/score_d_150.png'
import ImgFullE from '../images/score_e_150.png'
import ImgFullUnknown from '../images/score_unknown_150.png'
import ImgLetterA from '../images/score_a_letter.png'
import ImgLetterB from '../images/score_b_letter.png'
import ImgLetterC from '../images/score_c_letter.png'
import ImgLetterD from '../images/score_d_letter.png'
import ImgLetterE from '../images/score_e_letter.png'
import ImgLetterUnknown from '../images/score_unknown_letter.png'

const scores = ['A', 'B', 'C', 'D', 'E']
const imagesFull = [ImgFullA, ImgFullB, ImgFullC, ImgFullD, ImgFullE]
const imagesLetter = [ImgLetterA, ImgLetterB, ImgLetterC, ImgLetterD, ImgLetterE]
const thresholds = [158, 268, 536, 1071] // car, plane, 2 planes, 4 planes

const getHint = gCo2PerMilePax => {
  if (gCo2PerMilePax < thresholds[0]) {
    return 'emits less than a car'
  } else if (gCo2PerMilePax < thresholds[1]) {
    return 'emits less than a plane'
  } else {
    const factor = Math.round(gCo2PerMilePax / thresholds[1] * 10) / 10
    return `emits like ${factor} planes`
  }
}

const EcoScore = ({ gCo2PerMilePax, short = false }) => {
  if (gCo2PerMilePax == null) {
    const image = short ? ImgLetterUnknown : ImgFullUnknown
    return (
      <Box display='flex' alignItems='center'>
        <Image
          marginRight={2}
          src={image}
          alt='EcoScore unknown'
          title='EcoScore unknown'
          width={short ? 'initial' : '75px'}
          height={short ? '25px' : 'initial'}
        />
        <Text m={0}>unknown</Text>
      </Box>
    )
  }
  const scoreIdx1 = thresholds.findIndex(t => gCo2PerMilePax < t)
  const scoreIdx = scoreIdx1 >= 0 ? scoreIdx1 : 4
  const score = scores[scoreIdx]
  const images = short ? imagesLetter : imagesFull
  const image = images[scoreIdx]
  const hint = getHint(gCo2PerMilePax)
  return (
    <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-start'>
      <Image
        src={image}
        alt={`EcoScore ${score} - ${hint}`}
        title={`EcoScore ${score} - ${hint}`}
        width={short ? 'initial' : '75px'}
        height={short ? '25px' : 'initial'}
      />
      <Text m={0}>
        {hint}
        {!short && ' (on average kg·CO₂/passenger/km)'}
      </Text>
      {!short &&
        <Link as={ReactLink} to='/ecoscore' fontSize='sm'>
          <Text display='inline' m={0}><Icon name='info-outline' /> EcoScore documentation</Text>
        </Link>}
    </Stack>
  )
}

export default EcoScore
