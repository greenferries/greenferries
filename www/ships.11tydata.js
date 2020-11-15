module.exports = {
  eleventyComputed: {
    ships: data => data.collections.ship.filter(s => !s.data.outOfScope).map(x => x.data)
  }
}
