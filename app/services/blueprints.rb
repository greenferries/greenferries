module Blueprints
  class City < Blueprinter::Base
    identifier :id
    fields :name, :country, :latitude, :longitude
  end

  class Route < Blueprinter::Base
    identifier :id
    fields :distance_km
    association :city_a, blueprint: City
    association :city_b, blueprint: City
  end

  class ShipRoute < Blueprinter::Base
    fields :g_co2_per_pax
    association :route, blueprint: Route
  end

  class Company < Blueprinter::Base
    identifier :id
    fields :name, :imo, :wikipedia_url, :country
    field :logo_url do |company|
      if company.logo.attached?
        company.logo.service_url
      end
    end
  end

  class Ship < Blueprinter::Base
    identifier :id
    fields :imo, :name, :company_id, :capacity_pax, :wikipedia_url, :g_co2_per_mile_pax, :data_source
    association :ship_routes, blueprint: ShipRoute
    association :company, blueprint: Company
  end
end
