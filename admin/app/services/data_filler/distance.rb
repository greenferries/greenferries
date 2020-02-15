class DataFiller::Distance
  def initialize(scope='missing')
    @scope = scope
  end

  def perform
    routes.find_each { |route| recompute_route(route) }
    Ship.includes(:routes).find_each do |ship|
      ship.ship_routes.each { |sr| recompute_ship_routes(sr) }
    end
  end

  private

  def routes
    if @scope == 'all'
      return Route.all
    elsif @scope == 'missing'
      Route.where(distance_km: nil).or(Route.where(distance_nms: nil))
    end
  end

  def recompute_route(route)
    route.distance_km = route.city_a.distance_to(route.city_b, units: :kms)
    route.distance_nms = route.city_a.distance_to(route.city_b, units: :nms)
    route.save!
  end

  def recompute_ship_routes(ship_route)
    if ship_route.ship.g_co2_per_mile_pax.nil?
      ship_route.g_co2_per_pax = nil
    else
      ship_route.g_co2_per_pax =
        ship_route.ship.g_co2_per_mile_pax *
        ship_route.route.distance_nms
    end
    ship_route.save!
  end
end
