class CreateAirports < ActiveRecord::Migration[6.0]
  def change
    create_table :airports do |t|
      t.string :country
      t.string :code
      t.string :name
      t.float :latitude
      t.float :longitude
    end
  end
end
