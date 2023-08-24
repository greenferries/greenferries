const { getCollectionFromDb } = require('../../lib')

module.exports = (async function () {
  const routes = await getCollectionFromDb(`
    SELECT routes.*,
      cities_a.name AS city_a_name, cities_b.name AS city_b_name,
      cities_a.country AS city_a_country, cities_b.country AS city_b_country,
      cities_a.latitude AS city_a_latitude, cities_b.latitude AS city_b_latitude,
      cities_a.longitude AS city_a_longitude, cities_b.longitude AS city_b_longitude,
      ships.imo AS ship_imo,
      ships.name AS ship_name,
      ships.slug AS ship_slug,
      ships.photo AS ship_photo,
      ships.out_of_scope AS ship_out_of_scope,
      ships.ecoscore_letter AS ship_ecoscore_letter,
      companies.name as ship_company_name
    FROM routes
    LEFT JOIN cities cities_a ON routes.city_a_slug = cities_a.slug
    LEFT JOIN cities cities_b ON routes.city_b_slug = cities_b.slug
    INNER JOIN ships_routes ON routes.slug = ships_routes.route_slug
    LEFT JOIN ships ON ships_routes.imo = ships.imo
    LEFT JOIN companies ON ships.company_slug = companies.slug
    ORDER BY ships.slug ASC
  `, { regroupFields: ["ship"] })
  return routes
})()

  //   eleventyComputed: {
  //     cityA: data => (data.collections.city.find(x => x.data.slug === data.cityA) || {}).data,
  //     cityB: data => (data.collections.city.find(x => x.data.slug === data.cityB) || {}).data,
  //     shipRoutes: data => data.collections.ship
  //       .filter(x => x.data.routes?.includes(data.slug))
  //       .map(shipPage => ({ ship: shipPage.data }))
  //   }
