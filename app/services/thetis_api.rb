class ThetisApi
  BASE_URL = 'http://data.greenferries.org/greenferries/thetis.json'
  def self.get_ship_by_imo(imo)
    url = BASE_URL + "?imo__exact=#{imo}&_shape=objects"
    puts "getting #{url} ..."
    HTTP.get(url).parse['rows'][0]
  end
end
