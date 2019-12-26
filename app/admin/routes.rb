ActiveAdmin.register Route do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :city_a_id, :city_b_id, :distance_km
  #
  # or
  #
  # permit_params do
  #   permitted = [:city_a_id, :city_b_id, :distance_km]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
