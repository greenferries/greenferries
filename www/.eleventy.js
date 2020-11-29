const smartRound = (i) => i > 1 ? Math.round(i) : i

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./assets/img": "./img" });
  eleventyConfig.addPassthroughCopy({ "./assets/js": "./js" });
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "./admin/config.yml" });
  eleventyConfig.addPassthroughCopy({ "./assets/css/leaflet_1.7.1.css": "./css/leaflet_1.7.1.css" });

  eleventyConfig.addWatchTarget("./assets/css/*.css")
  eleventyConfig.addWatchTarget("./admin/config.yml")

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addFilter("jsonify", e => JSON.stringify(e, 2));

  eleventyConfig.addFilter("fullRouteName", route => `
    ${route.cityA.name} [${route.cityA.country}]
    ↔
    ${route.cityB.name} [${route.cityB.country}]
  `)

  eleventyConfig.addFilter("figureCell", ({ value, unit, computed = false }) =>
    value ? `${smartRound(value)} ${unit} ${computed ? "⚙️" : ""}`.replace(/ /g, "&nbsp;") : "N/A"
  )

  eleventyConfig.addFilter("routeCoordinates", route => [
    [route.cityA.latitude, route.cityA.longitude],
    [route.cityB.latitude, route.cityB.longitude]
  ])

  eleventyConfig.addFilter("countPlural", ({ word, count }) =>
    `${count} ${count == 1 ? word : `${word}s` }`
  )


  eleventyConfig.addFilter("countryCodeToFlag", code => {
    return {
      US: "🇺🇸",
      IT: "🇮🇹",
      GB: "🇬🇧",
      GR: "🇬🇷",
      FI: "🇫🇮",
      DE: "🇩🇪",
      ES: "🇪🇸",
      NO: "🇳🇴",
      FR: "🇫🇷",
      DK: "🇩🇰",
      AU: "🇦🇺",
      PL: "🇵🇱",
      SE: "🇸🇪",
      EE: "🇪🇪",
      DZ: "🇩🇿",
      RU: "🇷🇺",
      CA: "🇨🇦",
      TN: "🇹🇳",
      CY: "🇨🇾",
      JP: "🇯🇵",
      HR: "🇭🇺",
    }[code]
  })

  eleventyConfig.addFilter('extractShips', routes => routes.map(i => i.ship))

  eleventyConfig.addFilter('getValues', d => Object.values(d))

  eleventyConfig.addFilter('extractData', items => items.map(i => i.data))

  eleventyConfig.addFilter(
    'shipsForRoute',
    ({ shipPages, routeSlug }) => shipPages.filter(ship => ship.data.routes.includes(routeSlug))
  )

  eleventyConfig.addFilter('collectionSingularToPlural', singular => {
    return {"company": "companies"}[singular] || `${singular}s`
  })

  eleventyConfig.addFilter('inScope', collection => Object.values(collection).filter(o => !o.data.outOfScope))

  eleventyConfig.addFilter("ecoscoreLetterToImgFileKey", letter => letter ? letter : "unknown")


  eleventyConfig.addFilter("ecoscoreLetterToHint", letter => {
    return {
      A: "better than riding a car with two passengers",
      B: "better than riding a car with a single passenger",
      C: "1 to 2 times an average plane's emissions",
      D: "2 to 4 times an average plane's emissions",
      E: "over 4 times an average plane's emissions",
    }[letter]
  })

  return {
    dir: {
      input: "views",
      layouts: "_layouts"
    }
  }
}
