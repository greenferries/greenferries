class ImportAirportsJob < ActiveJob::Base

  URL = "http://127.0.0.1:8001/airports/airports.json?_shape=objects&_size=1000"

  def perform
    Airport.delete_all
    res = HTTP.get(URL)
    res.parse['rows'].each do |raw_airport|
      Airport.create!(raw_airport.slice("country", "code", "name", "latitude", "longitude"))
    end
  end
end
