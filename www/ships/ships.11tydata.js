const { getEcoscore } = require('../lib/ecoscore')

module.exports = {
  eleventyComputed: {
    company: data => data.collections.company.find(company => company.data.slug === data.company)?.data,
    thetisData: data => data.thetis[`thetis-${data.imo}`],
    ecoscore: data => data.thetisData && data.thetisData['2019'] ? getEcoscore(data.thetisData['2019'].annualAverageCo2EmissionsPerTransportWorkPax) : { score: 'unknown', hint: '' },
    shipRoutes: data => data.collections.route
      .filter(routePage => data.routes.includes(routePage.data.slug))
      .map(routePage => ({
        route: routePage.data,
        otherShipsCount: data.collections.ship
          .filter(shipPage => shipPage.data.routes.includes(routePage.data.slug))
          .length - 1
      }))
  }
}
