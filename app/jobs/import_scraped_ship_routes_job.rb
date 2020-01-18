class ImportScrapedShipRoutesJob < ActiveJob::Base
  def perform
    ScraperApi.get_scraped_ship_routes.each { |s| create_ship_route(s) }
  end

  def create_ship_route(data)
    ship = Ship.where(imo: data['imo']).first
    if ship.nil?
      print("could not insert route for ship #{dat['imo']}")
      return
    end

    city_a = create_city({
      name: data['city_a'],
      geonames_id: data['city_a_geonameid'],
      country: data['city_a_country_code'],
      latitude: data['city_a_latitude'],
      longitude: data['city_a_longitude'],
    })
    city_b = create_city({
      name: data['city_b'],
      geonames_id: data['city_b_geonameid'],
      country: data['city_b_country_code'],
      latitude: data['city_b_latitude'],
      longitude: data['city_b_longitude'],
    })
    route = create_route(city_a, city_b)
    ship_route = ShipRoute.find_or_create_by!(ship: ship, route: route)
  end

  def create_city(city_data)
    City.
      create_with(**city_data).
      find_or_create_by!(geonames_id: city_data[:geonames_id])
  end

  def create_route(city_a, city_b)
    print("looking for route #{city_a} - #{city_b}")
    existing_route = Route.
      where(city_a: city_a, city_b: city_b).
      or(Route.where(city_a: city_b, city_b: city_a)).
      first
    return existing_route if existing_route

    Route.create!(city_a: city_a, city_b: city_b)
  end
end
