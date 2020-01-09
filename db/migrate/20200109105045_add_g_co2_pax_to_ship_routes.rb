class AddGCo2PaxToShipRoutes < ActiveRecord::Migration[6.0]
  def change
    add_column :ship_routes, :g_co2_per_pax, :float
  end
end
