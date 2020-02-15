ActiveAdmin.register Route do
  permit_params :city_a_id, :city_b_id, :distance_km


  form do |f|
    f.semantic_errors
    f.inputs do
      f.input :city_a_id, as: :select, collection: City.collection_for_select, input_html: {class: 'js-select2'}
      f.input :city_b_id, as: :select, collection: City.collection_for_select, input_html: {class: 'js-select2'}
    end
    f.actions
  end

end
