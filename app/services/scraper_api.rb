class ScraperApi
  BASE_URL = 'http://data.greenferries.org/greenferries/scraped_ship_routes.json?_shape=objects'
  def self.get_scraped_ship_routes
    HTTP.get(BASE_URL).parse['rows']
  end
end
