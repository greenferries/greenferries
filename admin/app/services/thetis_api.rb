class ThetisApi
  BASE_URL = 'https://data.greenferries.org/thetis/ships.json'.freeze
  # BASE_URL = 'http://127.0.0.1:8001/thetis/ships.json'

  def self.get_ship_by_imo(imo)
    url = BASE_URL + "?imo__exact=#{imo}&_shape=objects&_sort_desc=reporting_period"
    puts "getting #{url} ..."
    HTTP.get(url).parse('application/json')['rows'][0]
  end
end
