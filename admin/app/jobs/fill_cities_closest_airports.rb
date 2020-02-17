class FillCitiesClosestAirports < ActiveJob::Base
  def perform
    cities.each { |c| fill(c) }
  end

  private

  def cities
    City.all
  end

  def fill(city)
    airport = Airport.where(country: city.country).closest(origin: [city.latitude, city.longitude]).first
    return unless airport
    puts "#{city.name} [#{city.country}] setting closest airport #{airport.name} [#{airport.country}]"
    city.update!(target_airport_code: airport.code)
  end
end
