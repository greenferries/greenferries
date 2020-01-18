class AddGeonamesIdToCities < ActiveRecord::Migration[6.0]
  def change
    add_column :cities, :geonames_id, :integer
  end
end
