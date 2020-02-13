module Blueprints
  class City < Blueprinter::Base
    identifier :id
    fields :name, :country, :latitude, :longitude, :target_airport_code
  end

  class Route < Blueprinter::Base
    identifier :id
    fields :distance_km, :ships_count, :slug
    association :city_a, blueprint: City
    association :city_b, blueprint: City
  end

  class ShipRoute < Blueprinter::Base
    fields :g_co2_per_pax
    association :route, blueprint: Route
  end

  class Company < Blueprinter::Base
    identifier :id
    fields :name, :imo, :wikipedia_url, :country, :ships_count, :slug
    field :logo_url do |company|
      if company.logo.attached?
        Rails.env.development? ? Rails.application.routes.url_helpers.rails_blob_path(company.logo) : company.logo.service_url
      end
    end
  end

  class Ship < Blueprinter::Base
    identifier :id
    fields(
      :imo, :slug, :name, :company_id, :capacity_pax,
      :data_source, :routes_count,
      :wikipedia_url, :wikipedia_thumb_url,
      :thetis_average_co2_per_pax,
      :thetis_monitoring_method_a,
      :thetis_monitoring_method_b,
      :thetis_monitoring_method_c,
      :thetis_monitoring_method_d,
      :thetis_annual_co2_pax,
      :thetis_annual_co2_freight,
      :thetis_annual_co2_total,
      :thetis_average_co2_per_freight,
      :thetis_average_co2_per_distance,
      :thetis_annual_hours_at_sea,
      :thetis_annual_computed_distance,
      :thetis_annual_computed_distance_km,
      :thetis_annual_computed_pax,
      :thetis_annual_computed_freight,
      :thetis_annual_computed_average_speed,
      :thetis_annual_computed_ratio_co2_from_pax
    )
    association :ship_routes, blueprint: ShipRoute
    association :company, blueprint: Company
  end
end
