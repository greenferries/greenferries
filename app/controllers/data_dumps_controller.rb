class DataDumpsController < ActionController::Base
  def show
    ships = Ship.where.not(company: nil).order(:g_co2_per_mile_pax).all
    routes = Route.all.select{ |r| r.ships.where.not(company: nil).count > 0}
    render json: {
      routes: Blueprints::Route.render_as_hash(routes),
      ships: Blueprints::Ship.render_as_hash(ships),
    }
  end
end
