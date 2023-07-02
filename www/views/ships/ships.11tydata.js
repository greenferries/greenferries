const getMostRecentYear = (thetisData => Object.keys(thetisData).sort().reverse()[0])

module.exports = {
  eleventyComputed: {
    company: data => data.collections.company.find(company => company.data.slug === data.company)?.data,
    thetisData: data => data.thetis[`thetis-${data.imo}`],
    mostRecentYearDeclared: data => getMostRecentYear(data.thetis[`thetis-${data.imo}`]),
    shipRoutes: data => data.collections.route
      .filter(routePage => data.routes?.includes(routePage.data.slug))
      .map(routePage => ({
        route: routePage.data,
        otherShipsCount: data.collections.ship
          .filter(shipPage => shipPage.data.routes?.includes(routePage.data.slug))
          .length - 1
      }))
  }
}
