ActiveAdmin.register Company do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :imo, :wikipedia_url, :country, :logo
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :imo, :wikipedia_url, :country]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  show do
    attributes_table do
      row :name
      row :imo
      row :wikipedia_url
      row :country
      row :created_at
      row :updated_at
      row :logo do |r|
        image_tag url_for(r.logo) if r.logo.attached?
      end
    end
  end

  form do |f|
    f.semantic_errors
    f.inputs
    f.inputs do
      f.input :logo, as: :file, hint: f.object.logo.attached? ? image_tag(url_for(f.object.logo)) : nil
    end
    f.actions
  end

  sidebar :wikipedia, partial: 'wikipedia_sidebar', class: 'wikipedia', only: [:edit, :show]
end
