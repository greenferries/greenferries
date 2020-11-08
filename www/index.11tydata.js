module.exports = {
  eleventyComputed: {
    allRoutes: data => data.collections.route.map(routePage => {
      return {
        ...routePage.data,
        cityA: (data.collections.city.find(x => x.data.slug === routePage.data.cityA) || {}).data,
        cityB: (data.collections.city.find(x => x.data.slug === routePage.data.cityB) || {}).data,
        shipsCount: data.collections.ship
          .filter(x => x.data.routes.includes(routePage.data.slug))
          .length
      }
    })
  }
}
