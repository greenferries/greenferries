class ThetisApi
  BASE_URL = 'http://data.greenferries.org/data/thetis_mrv_2019_12_24.json'
  def self.get_ship_by_imo(imo)
    url = BASE_URL + "?imo__exact=#{imo}&_shape=objects"
    puts "getting #{url} ..."
    HTTP.get(url).parse['rows'][0]
  end
end
