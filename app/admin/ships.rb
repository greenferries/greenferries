ActiveAdmin.register Ship do

  permit_params :imo, :name, :company_id, :capacity_pax, :wikipedia_url, :g_co2_per_mile_pax, :data_source, :unknown_routes, :out_of_scope, :wikipedia_thumb_url, ship_routes_attributes: [:id, :route_id, :_destroy]

  form do |f|
    f.semantic_errors
    f.inputs
    f.inputs do
      f.has_many :ship_routes, heading: "Routes", allow_destroy: true do |r|
        r.input :route, input_html: {class: 'js-select2'}, collection: Route.human_ordered
      end
    end
    f.actions
  end

  sidebar :wikipedia, partial: 'wikipedia_sidebar', class: 'wikipedia', only: [:edit, :show]

  controller do
    def update
      update! do |format|
        return super unless request.referer.include?("filling_data")
        next_ship = Ship.
          treatable.
          with_g_co2_per_mile_pax.
          without_routes.
          first(10).sample(1).first
        if next_ship.present? && resource.valid?
          format.html { redirect_to edit_admin_ship_path(next_ship, filling_data: true) }
        end
      end
    end
  end
end
