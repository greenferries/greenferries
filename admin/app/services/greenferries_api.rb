class GreenferriesApi

  SQL = <<END_SQL.gsub(/\s+/, " ").strip
    SELECT
      thetis.imo,
      thetis.name as name_thetis,
      wikidata.label as name_wiki,
      thetis.ship_type,
      thetis.annual_average_co2_emissions_per_transport_work_pax,
      wikidata.wikipediaUrl as wikipedia_url,
      cast(wikidata.maximumCapacity as int) as capacity_pax,
      wikidata.operatorName AS operator_name,
      wikidata.operatorUrl AS operator_url,
      wikidata.operatorCountryCode AS operator_country_code,
      wikidata.ownerName AS owner_name,
      wikidata.ownerUrl AS owner_url,
      wikidata.ownerCountryCode AS owner_country_code
    FROM thetis
    LEFT JOIN wikidata on thetis.imo = wikidata.imo
    WHERE thetis.ship_type in ("Ro-pax ship", "Ro-ro ship", "Passenger ship")
END_SQL

  def self.get_all_ships
    url = "http://data.greenferries.org/greenferries.json?sql=#{URI.encode_www_form_component(SQL)}&_shape=objects"
    JSON.parse(Excon.get(url).body)["rows"]
  end
end
