class DataFiller::Thetis
  def perform(recompute_all=false)
    ships = recompute_all ? Ship.all : Ship.where(thetis_average_co2_per_pax: nil) # TODO
    ships.where.not(imo: nil).find_each { |ship| treat_ship(ship) }
  end

  private

  def treat_ship(ship)
    thetis_data = ThetisApi.get_ship_by_imo(ship.imo)
    if thetis_data.blank?
      puts "could not find ship #{ship.imo} (#{ship.name}) in THETIS"
      return
    end

    puts "storing THETIS data for ship #{ship.name} ..."
    ship.update!(
      thetis_monitoring_method_a: thetis_data["monitoring_method_a"],
      thetis_monitoring_method_b: thetis_data["monitoring_method_b"],
      thetis_monitoring_method_c: thetis_data["monitoring_method_c"],
      thetis_monitoring_method_d: thetis_data["monitoring_method_d"],
      thetis_annual_co2_pax: thetis_data["annual_monitoring_co2_emissions_assigned_to_passenger_transport"],
      thetis_annual_co2_freight: thetis_data["annual_monitoring_co2_emissions_assigned_to_freight_transport"],
      thetis_annual_co2_total: thetis_data["annual_monitoring_total_co2_emissions"],
      thetis_average_co2_per_pax: thetis_data["annual_average_co2_emissions_per_transport_work_pax"],
      thetis_average_co2_per_freight: thetis_data["annual_average_co2_emissions_per_transport_work_freight"],
      thetis_average_co2_per_distance: thetis_data["annual_average_co2_emissions_per_distance"],
      thetis_annual_hours_at_sea: thetis_data["annual_monitoring_total_time_spent_at_sea"],
      data_source: "THETIS-MRV-#{thetis_data['reporting_period']}"
    )
  end
end
