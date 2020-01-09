class DataDumpsController < ActionController::Base
  def show
    render json: {
      routes: Blueprints::Route.render_as_hash(Route.all),
      ships: Blueprints::Ship.render_as_hash(Ship.order(:g_co2_per_mile_pax).all),
    }
  end
end
