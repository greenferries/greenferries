class AddTargetAirportCodeToCities < ActiveRecord::Migration[6.0]
  def change
    add_column :cities, :target_airport_code, :string
  end
end
