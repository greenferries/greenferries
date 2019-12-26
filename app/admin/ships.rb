ActiveAdmin.register Ship do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :imo, :name, :company_id, :capacity_pax, :wikipedia_url, :g_co2_per_mile_pax, :data_source, ship_routes_attributes: [:id, :route_id, :_destroy]

  #
  # or
  #
  # permit_params do
  #   permitted = [:imo, :name, :company_id, :capacity_pax, :wikipedia_url, :g_co2_per_mile_pax, :data_source]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  form do |f|
    f.semantic_errors
    f.inputs
    f.inputs do
      f.has_many :ship_routes, heading: "Routes", allow_destroy: true do |r|
        r.input :route
      end
    end
    f.actions
  end

end
