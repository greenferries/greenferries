class ExportEleventyJsons < ActiveJob::Base
  def perform
    Ship
      .includes(:company, routes: [:city_a, :city_b])
      .where.not(company: nil)
      .each { export_ship(_1) }

    Company.all.each { export_company(_1) }
    Route.includes(:city_a, :city_b).all.each { export_route(_1) }
    City.all.each { export_city(_1) }
  end

  private

  def export_ship(ship)
    write_json(
      "ships/ship-#{ship.slug}.json",
      slug: ship.slug,
      imo: ship.imo,
      name: ship.name,
      company: ship.company.slug,
      capacityPax: ship.capacity_pax,
      wikipediaUrl: ship.wikipedia_url,
      thumbFileName: ship.wikipedia_thumb_url && File.basename(ship.wikipedia_thumb_url),
      outOfScope: ship.out_of_scope,
      unknownRoutes: ship.unknown_routes,
      routes: ship.routes.map(&:slug)
    )
  end

  def export_company(company)
    write_json(
      "companies/company-#{company.slug}.json",
      slug: company.slug,
      name: company.name,
      imo: company.imo,
      wikipediaUrl: company.wikipedia_url,
      country: company.country,
      officialUrl: company.official_url,
      logoFileName: "#{company.logo_blob&.key}.png"
    )
  end

  def export_route(route)
    write_json(
      "routes/route-#{route.slug}.json",
      slug: route.slug,
      cityA: route.city_a.slug,
      cityB: route.city_b.slug,
      distanceKm: route.distance_km,
      distanceNms: route.distance_nms
    )
  end

  def export_city(city)
    write_json(
      "cities/city-#{city.slug}.json",
      slug: city.slug,
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      targetAirportCode: city.target_airport_code,
      geonamesId: city.geonames_id
    )
  end

  def write_json(path, **obj)
    file_path = Rails.root.join("..", "www", "_data", path)
    serialized = JSON.pretty_generate(obj)
    File.write(file_path, serialized)
  end
end
