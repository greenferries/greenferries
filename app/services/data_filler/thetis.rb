class DataFiller::Thetis
  def perform
    Ship.where(g_co2_per_mile_pax: nil).where.not(imo: nil).find_each do |ship|
      thetis_data = ThetisApi.get_ship_by_imo(ship.imo)
      if thetis_data.blank?
        puts "could not find ship #{ship.imo} (#{ship.name}) in THETIS"
        next
      elsif thetis_data['annual_average_co2_emissions_per_transport_work_pax'].blank?
        puts "ship #{ship.imo} (#{ship.name}) doesn't have annual_average_co2_emissions_per_transport_work_pax data"
        next
      end

      puts "storing #{thetis_data['annual_average_co2_emissions_per_transport_work_pax']} for ship #{ship.name} ..."
      ship.update!(
        g_co2_per_mile_pax: thetis_data['annual_average_co2_emissions_per_transport_work_pax'],
        data_source: "THETIS-MRV-2019"
      )
    end
  end
end
