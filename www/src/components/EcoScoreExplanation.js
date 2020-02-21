import React from 'react'
import { Box, Text, Image, Link, Alert, AlertIcon, Stack } from '@chakra-ui/core'
import { Link as ReactLink } from 'react-router-dom'
import ScoreImg from '../images/score_b_150.png'

const EcoScoreExplanation = () => {
  return (
    <Box marginTop={3}>
      <Alert status='info'>
        <AlertIcon />
        <Box>
          <Stack spacing={2} direction='row' alignItems='center' flexWrap='wrap'>
            <Text as='h3' fontSize='md' m={0}>EcoScore</Text>
            <Box marginRight={3}>
              <Image marginTop={2} src={ScoreImg} objectFit='contain' maxWidth={100} />
            </Box>
            <Text m={0} maxWidth='30rem'>
              Scores ferries <b>average CO₂ emissions per kilometer per passenger</b>.
              {' '}
              <i>"emits like 2.1 planes"</i> compares gCO₂ / km / pass. with an average plane.
              {' '}
            </Text>
            <Box>
              <Link as={ReactLink} to='/ecoscore'>More…</Link>
            </Box>
          </Stack>
        </Box>
      </Alert>
    </Box>
  )
}

export default EcoScoreExplanation
