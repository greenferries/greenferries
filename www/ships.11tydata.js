module.exports = {
  eleventyComputed: {
    ships: data => data.collections.ship.map(x => x.data)
  }
}
