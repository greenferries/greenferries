import React, { useRef, useState, useEffect } from 'react'
import { Box, Input, Select, Stack, Button } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import { getNewUrlWithQueryParam } from '../lib/queryParamsUtils'
import debounce from '../lib/debounce'

const ShipSearchForm = ({
  setSearchTerm, searchTermVisible, setSearchTermVisible,
  companies, company, setCompany,
  sortBy, setSortBy,
  doSetPage,
  setIsLoading
}) => {
  const history = useHistory()
  const [unfolded, setUnfolded] = useState()

  const doSetSortBy = newValue => {
    setSortBy(newValue)
    history.push(getNewUrlWithQueryParam('sortBy', newValue))
  }
  const doSetCompany = newCompany => {
    setCompany(newCompany)
    history.push(getNewUrlWithQueryParam('company', newCompany && newCompany.slug))
    doSetPage(1)
  }
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

  useEffect(() => {
    if (unfolded) return
    if (!!company || sortBy !== 'name' || !!searchTermVisible) setUnfolded(true)
  }, [company, sortBy, searchTermVisible, unfolded])

  return (
    <Box border='1px solid #ccc' borderRadius={5} p={3}>
      {!unfolded &&
        <Button
          onClick={() => setUnfolded(true)}
          size='sm'
          variant='ghost'
          border={0}
          cursor='pointer'
        >
          Filter and sort options...
        </Button>}
      {unfolded &&
        <Stack spacing={2}>
          <Box display='flex' alignItems='baseline'>
            <label htmlFor='search'>
              Search:
            </label>
            <Input
              name='search'
              value={searchTermVisible}
              onChange={e => doSetSearchTermVisible(e.currentTarget.value)}
              placeholder='MV Tera Jet'
              width='auto'
              size='sm'
              marginLeft={1}
            />
          </Box>
          <Box display='flex' alignItems='baseline'>
            <label htmlFor='company'>
              Company:
            </label>
            <Select
              name='company'
              value={company && company.slug}
              onChange={e =>
                doSetCompany(companies.find(c => c.slug === e.target.value))}
              width='auto'
              size='sm'
              marginLeft={1}
            >
              <option value='' />
              {companies && companies.map(c =>
                <option key={c.id} value={c.slug}>
                  {c.name} [{c.country}]
                </option>
              )}
            </Select>
          </Box>
          <Box display='flex' alignItems='baseline'>
            <label htmlFor='sortBy'>Sort By:</label>
            <Select
              name='sortBy'
              value={sortBy}
              onChange={e => doSetSortBy(e.currentTarget.value)}
              width='auto'
              size='sm'
              marginLeft={1}
            >
              <option key='name' value='name'>
                Name
              </option>
              <option key='scoreDesc' value='scoreDesc'>
                Score ↘ (best first)
              </option>
              <option key='scoreAsc' value='scoreAsc'>
                Score ↗️ (worse first)
              </option>
            </Select>
          </Box>
        </Stack>}
    </Box>
  )
}

export default ShipSearchForm
