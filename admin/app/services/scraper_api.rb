class ScraperApi
  BASE_URL = 'http://data.greenferries.org/greenferries/scraped_ship_routes.json?_shape=objects'
  def self.get_scraped_ship_routes
    JSON.parse(Excon.get(BASE_URL).body)['rows']
  end
end
