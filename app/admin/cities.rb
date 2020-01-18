ActiveAdmin.register City do
  permit_params :name, :country, :latitude, :longitude, :geonames_id


  form do |f|
    f.semantic_errors
    f.inputs
    f.inputs do
      f.input :geonames_id, as: :string, label: 'GeoNames ID'
    end
    f.actions
  end

end
