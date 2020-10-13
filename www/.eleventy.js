const smartRound = (i) => i > 1 ? Math.round(i) : i

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./assets/img": "./img" });
  eleventyConfig.addPassthroughCopy({ "./assets/js": "./js" });
  eleventyConfig.addPassthroughCopy({ "./assets/css/leaflet_1.7.1.css": "./css/leaflet_1.7.1.css" });

  eleventyConfig.addWatchTarget("./assets/css/*.css")

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
}
