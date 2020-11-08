module.exports = {
  eleventyComputed: {
    ships: data => data.collections.ship
      .filter(x => x.data.company === data.slug)
      .map(x => ({ ...x.data }))
  }
}
