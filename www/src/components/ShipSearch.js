import React, { useState, useEffect } from 'react'
import { Box, Spinner } from '@chakra-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { getNewUrlWithQueryParam } from '../lib/queryParamsUtils'
import ShipSearchRow from './ShipSearchRow'
import ShipSearchForm from './ShipSearchForm'
import Pagination from './Pagination'

const SHIPS_PER_PAGE = 20

const ShipSearch = ({ ships, companies }) => {
  const history = useHistory()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [company, setCompany] = useState()
  const [searchTerm, setSearchTerm] = useState()
  const [searchTermVisible, setSearchTermVisible] = useState(searchTerm || '')
  const [page, setPage] = useState(1)

  const doSetPage = newValue => {
    setPage(newValue)
    history.push(getNewUrlWithQueryParam('page', newValue))
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const pageFromQuery = query.get('page')
    if (pageFromQuery) setPage(parseInt(pageFromQuery, 10))
    const sortByFromQuery = query.get('sortBy')
    if (sortByFromQuery) setSortBy(sortByFromQuery)
    const nameFromQuery = query.get('name')
    if (nameFromQuery) {
      setSearchTerm(nameFromQuery)
      setSearchTermVisible(nameFromQuery)
    }
    const companySlugFromQuery = query.get('company')
    if (companySlugFromQuery && companies) {
      const foundCompany = companies.find(c => c.slug === companySlugFromQuery)
      if (foundCompany) setCompany(foundCompany)
    }
  }, [companies, location])

  if (!ships) return null
  const filters = []
  if (searchTerm) filters.push(s => s.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
  if (company) filters.push(ship => ship.company.id === company.id)
  const filteredShips = filters.length ? ships.filter(ship =>
    filters.map(filter => filter(ship)).every(r => r)
  ) : ships
  const sortFunction = {
    name: (s1, s2) => s1.name > s2.name,
    scoreDesc: (s1, s2) => {
      if (!s2.thetisAverageCo2PerPax) return -1
      if (!s1.thetisAverageCo2PerPax) return 1
      return s1.thetisAverageCo2PerPax > s2.thetisAverageCo2PerPax
    },
    scoreAsc: (s1, s2) => s1.thetisAverageCo2PerPax < s2.thetisAverageCo2PerPax
  }[sortBy]
  const shipsSorted = filteredShips.sort(sortFunction)
  const pageCount = Math.ceil(filteredShips.length / SHIPS_PER_PAGE)
  const currentPageShips = shipsSorted.slice((page - 1) * SHIPS_PER_PAGE, page * SHIPS_PER_PAGE)

  const paginationBox = (
    <Box paddingX={{ base: 3, md: 5 }}>
      <Pagination
        doSetPage={doSetPage}
        currentPage={page}
        pageCount={pageCount}
      />
    </Box>
  )

  return (
    <Box>
      <Box paddingX={{ base: 3, md: 5 }}>
        <h2>Explore {ships.length} ferries</h2>
        <ShipSearchForm
          companies={companies}
          sortBy={sortBy}
          setSortBy={setSortBy}
          company={company}
          setCompany={setCompany}
          setSearchTerm={setSearchTerm}
          searchTermVisible={searchTermVisible}
          setSearchTermVisible={setSearchTermVisible}
          doSetPage={doSetPage}
          setIsLoading={setIsLoading}
        />
      </Box>

      <Box position='relative'>
        {isLoading &&
          <Box
            position='absolute'
            width='100%'
            textAlign='center'
            height='100%'
            paddingTop={10}
            background='rgba(255,255,255,0.6)'
          >
            <Spinner />
          </Box>}

        <Box marginTop={3} paddingX={{ base: 3, md: 5 }}>
          {filteredShips.length !== ships.length &&
            <span>filtered {filteredShips.length} ferries</span>}
        </Box>

        {filteredShips.length > 0 && paginationBox}

        {filteredShips.length > 0 && currentPageShips.map((ship, idx) =>
          <ShipSearchRow key={ship.id} ship={ship} idx={idx} />)}

        {filteredShips.length > 0 && paginationBox}
      </Box>
    </Box>
  )
}

export default ShipSearch
