const { dbQueryAll, getTablesColumns } = require('../lib/db_query')
const { sliceRow, hydrateRows } = require('../lib/hydrate')
const { augmentShip, augmentCompany } = require('../lib/augmenters')

const hydrateRow = async (row) => {
  const company = await sliceRow(row, 'companies')
  company.logoKey = row.logoKey
  return {
    ...augmentCompany(company),
    ships: [augmentShip(await sliceRow(row, 'ships', 'ship_'))]
  }
}

const getRows = async () => {
  const tablesColumns = await getTablesColumns()
  return await dbQueryAll(`
    SELECT
      companies.*,
      as_blobs.key AS logoKey,
      ${tablesColumns.ships.map(col => `ships.${col} AS ship_${col}`).join(', ')}
    FROM companies
    LEFT JOIN ships ON ships.company_id = companies.id
    LEFT JOIN active_storage_attachments as_attachments
      ON as_attachments.record_id = companies.id AND as_attachments.record_type = 'Company'
    LEFT JOIN active_storage_blobs as_blobs ON as_blobs.id = as_attachments.blob_id
    ORDER BY companies.name
  `)
}

module.exports = async function () {
  const companies = await hydrateRows(await getRows(), hydrateRow)
  // console.log('companies is ', companies)
  return companies
}
