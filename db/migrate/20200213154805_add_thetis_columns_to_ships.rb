class AddThetisColumnsToShips < ActiveRecord::Migration[6.0]
  def change
    add_column :ships, :thetis_monitoring_method_a, :boolean
    add_column :ships, :thetis_monitoring_method_b, :boolean
    add_column :ships, :thetis_monitoring_method_c, :boolean
    add_column :ships, :thetis_monitoring_method_d, :boolean
    add_column :ships, :thetis_annual_co2_pax, :float
    add_column :ships, :thetis_annual_co2_freight, :float
    add_column :ships, :thetis_annual_co2_total, :float
    add_column :ships, :thetis_average_co2_per_freight, :float
    add_column :ships, :thetis_average_co2_per_distance, :float
    add_column :ships, :thetis_annual_hours_at_sea, :float
    add_column :ships, :thetis_annual_computed_distance, :float
    add_column :ships, :thetis_annual_computed_distance_km, :float
    add_column :ships, :thetis_annual_computed_pax, :float
    add_column :ships, :thetis_annual_computed_freight, :float
    add_column :ships, :thetis_annual_computed_average_speed, :float
    add_column :ships, :thetis_annual_computed_ratio_co2_from_pax, :float
    rename_column :ships, :g_co2_per_mile_pax, :thetis_average_co2_per_pax
  end
end
