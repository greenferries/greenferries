import React, { useRef } from 'react'
import { Box, Input, Stack } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import { getNewUrlWithQueryParam } from '../lib/queryParamsUtils'
import debounce from '../lib/debounce'

const CompanySearchForm = ({
  setSearchTerm, searchTermVisible, setSearchTermVisible,
  doSetPage,
  setIsLoading
}) => {
  const history = useHistory()

  const doSetSearchTerm = newValue => {
    // this is called after debouncing and will filter the list
    setSearchTerm(newValue)
    history.push(getNewUrlWithQueryParam('name', newValue))
    doSetPage(1)
    setIsLoading(false)
  }
  const debouncedSetSearchTerm = useRef(debounce(doSetSearchTerm, 500)).current
  const doSetSearchTermVisible = (newValue) => {
    // this is called upon each key press, and only changes the input value
    setIsLoading(true)
    setSearchTermVisible(newValue)
    debouncedSetSearchTerm(newValue)
  }

  return (
    <Box border='1px solid #ccc' borderRadius={5} p={3}>
      <Stack spacing={2}>
        <Box display='flex' alignItems='baseline'>
          <label htmlFor='search'>
            Search:
          </label>
          <Input
            name='search'
            value={searchTermVisible}
            onChange={e => doSetSearchTermVisible(e.currentTarget.value)}
            placeholder='Blue Ferries'
            width='auto'
            size='sm'
            marginLeft={1}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default CompanySearchForm
