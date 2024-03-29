const smartRound = (i) => i > 1 ? Math.round(i) : i

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img")
  eleventyConfig.addPassthroughCopy("js")
  eleventyConfig.addPassthroughCopy("css")

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addFilter("jsonify", e => JSON.stringify(e, 2));

  eleventyConfig.addFilter("fullRouteName", route => `
    ${route.cityAName} [${route.cityACountry}]
    ↔
    ${route.cityBName} [${route.cityBCountry}]
  `)

  eleventyConfig.addFilter("figureCell", ({ value, unit, computed = false }) =>
    value ? `${smartRound(value)} ${unit} ${computed ? "⚙️" : ""}`.replace(/ /g, "&nbsp;") : "N/A"
  )

  eleventyConfig.addFilter("routeCoordinates", route => [
    [route.cityALatitude, route.cityALongitude],
    [route.cityBLatitude, route.cityBLongitude]
  ])

  eleventyConfig.addFilter("countPlural", ({ word, count }) =>
    `${count} ${count == 1 ? word : `${word}s`}`
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
    return { "company": "companies" }[singular] || `${singular}s`
  })

  eleventyConfig.addFilter('inScope', collection => Object.values(collection).filter(o => !o.data.outOfScope))
  eleventyConfig.addFilter('outOfScope', collection => Object.values(collection).filter(o => o.data.outOfScope))

  eleventyConfig.addFilter('withoutRoutes', collection => Object.values(collection).filter(o => (o.data.routes || []).length == 0))

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

  eleventyConfig.addFilter("monitoringMethodLetterToDescription", letter => {
    return {
      a: "BDN and period stock takes of fuel tanks",
      b: "Bunker fuel tank monitoring on-board",
      c: "Flow meters for applicable combustion processes",
      d: "Direct CO2 emissions measurement"
    }[letter]
  })

  return {
    dir: {
      input: "11ty_input",
      output: "11ty_output",
      layouts: "_layouts"
    },
    markdownTemplateEngine: "njk"
  }
}
