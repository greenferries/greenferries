const slug = require('slug')
const { dbQueryAll, getTablesColumns } = require('../lib/db_query')
const { sliceRow, hydrateRows } = require('../lib/hydrate')
const { augmentShip } = require('../lib/augmenters')

const hydrateRow = async (row) => {
  const company = await sliceRow(row, 'companies')
  return {
    ...company,
    logoUrl: `https://res.cloudinary.com/outofscreen/image/upload/${row.logoKey}.png`,
    slug: slug(`${row.name}-${row.country}`),
    ships: [augmentShip(await sliceRow(row, 'ships', 'ship_'))]
  }
}

const getRows = async () => {
  const tablesColumns = await getTablesColumns()
  return await dbQueryAll(`
    SELECT
      companies.*,
      asb.key AS logoKey,
      ${tablesColumns.ships.map(col => `ships.${col} AS ship_${col}`).join(', ')}
    FROM companies
    LEFT JOIN ships ON ships.company_id = companies.id
    LEFT JOIN active_storage_attachments asa
      ON asa.record_id = companies.id AND asa.record_type = 'Company'
    LEFT JOIN active_storage_blobs asb ON asb.id = asa.blob_id
    ORDER BY companies.name
  `)
}

module.exports = async function () {
  const companies = await hydrateRows(await getRows(), hydrateRow)
  return companies
}
