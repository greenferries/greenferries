module.exports = {
  eleventyComputed: {
    cityA: data => (data.collections.city.find(x => x.data.slug === data.cityA) || {}).data,
    cityB: data => (data.collections.city.find(x => x.data.slug === data.cityB) || {}).data,
    shipRoutes: data => data.collections.ship
      .filter(x => x.data.routes?.includes(data.slug))
      .map(shipPage => ({ ship: shipPage.data }))
  }
}
