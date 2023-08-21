const getMostRecentYear = (thetisData => Object.keys(thetisData).sort().reverse()[0])

module.exports = async () => {
  const thetis = await require("../../thetis")
  return {
    eleventyComputed: {
      thetisData: data => thetis[data.imo] || {},
      company: data => data.collections.company.find(company => company.data.slug === data.company)?.data,
      mostRecentYearDeclared: data => getMostRecentYear(thetis[data.imo] || {}),
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
}
