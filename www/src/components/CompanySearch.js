import React, { useState, useEffect } from 'react'
import { Box, Spinner } from '@chakra-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { getNewUrlWithQueryParam } from '../lib/queryParamsUtils'
import CompanySearchRow from './CompanySearchRow'
import CompanySearchForm from './CompanySearchForm'
import Pagination from './Pagination'

const COMPANIES_PER_PAGE = 20

const CompanySearch = ({ companies }) => {
  const history = useHistory()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
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
    const nameFromQuery = query.get('name')
    if (nameFromQuery) {
      setSearchTerm(nameFromQuery)
      setSearchTermVisible(nameFromQuery)
    }
  }, [location])

  if (!companies) return null
  const filters = []
  if (searchTerm) filters.push(company => company.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
  const filteredCompanies = filters.length ? companies.filter(company =>
    filters.map(filter => filter(company)).every(r => r)
  ) : companies
  const sortFunction = {
    name: (s1, s2) => s1.name > s2.name
  }.name
  const companiesSorted = filteredCompanies.sort(sortFunction)
  const pageCount = Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE)
  const currentPageCompanies = companiesSorted.slice((page - 1) * COMPANIES_PER_PAGE, page * COMPANIES_PER_PAGE)

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
        <h2>Explore {companies.length} companies</h2>
        <CompanySearchForm
          companies={companies}
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
          {filteredCompanies.length !== companies.length &&
            <span>filtered {filteredCompanies.length} companies</span>}
        </Box>

        {filteredCompanies.length > 0 && paginationBox}

        {filteredCompanies.length > 0 && currentPageCompanies.map((company, idx) =>
          <CompanySearchRow key={company.id} company={company} idx={idx} />)}

        {filteredCompanies.length > 0 && paginationBox}
      </Box>
    </Box>
  )
}

export default CompanySearch
