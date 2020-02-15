import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import { Box, Link, Text, Select } from '@chakra-ui/core'
import { getNewUrlWithQueryParam } from '../lib/queryParamsUtils'

const PageLink = ({ page, doSetPage, children, ...otherProps }) => (
  <Link
    as={ReactLink}
    to={getNewUrlWithQueryParam('page', page)}
    onClick={() => doSetPage(page)}
    {...otherProps}
  >
    {children}
  </Link>
)

const Pagination = ({ currentPage, pageCount, doSetPage }) => (
  <Box display='flex' marginY={3} flexWrap='wrap' justifyContent='space-between' alignItems='baseline'>
    <Box>
      {currentPage > 1 &&
        <PageLink page={currentPage - 1} doSetPage={doSetPage}>
          ◀️ previous
        </PageLink>}
      {currentPage === 1 &&
        <Text m={0} color='transparent'>◀️ previous</Text>}
    </Box>
    <Box display='flex' alignItems='baseline'>
      <Box>page:</Box>
      <Box marginLeft={1}>
        <Select
          value={currentPage}
          onChange={e => doSetPage(parseInt(e.target.value, 10))}
          size='sm'
        >
          {[...Array(pageCount).keys()].map(pageIdx =>
            <option key={pageIdx + 1} value={pageIdx + 1}>
              {pageIdx + 1}
            </option>
          )}
        </Select>
      </Box>
      <Box marginLeft={1}>/ {pageCount}</Box>
    </Box>
    <Box>
      {currentPage < pageCount &&
        <PageLink page={currentPage + 1} doSetPage={doSetPage}>
          next ▶
        </PageLink>}
      {currentPage === pageCount &&
        <Text m={0} color='transparent'>next ▶</Text>}
    </Box>

  </Box>
)

export default Pagination
