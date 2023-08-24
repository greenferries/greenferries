const { getCollectionFromDb } = require('../../lib')

module.exports = (async function () {
  return await getCollectionFromDb(`
    SELECT
      companies.*,
      ships.slug AS ship_slug,
      ships.name AS ship_name,
      ships.photo AS ship_photo,
      ships.ecoscore_letter AS ship_ecoscore_letter
    FROM companies
    LEFT JOIN ships ON companies.slug = ships.company_slug
    WHERE companies.out_of_scope IS false
    ORDER BY companies.slug ASC
  `, { regroupFields: ["ship"] })
})()
