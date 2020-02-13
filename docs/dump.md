
## other


annual_monitoring_co2_emissions_assigned_to_on_laden # always null for passenger ferries
voluntary_reporting_total_time_spent_at_sea
annual_average_co2_emissions_per_transport_work_mass #  g CO₂ / m tonnes · n miles. check it's content
annual_average_co2_emissions_per_transport_work_dwt #  g CO₂ / dwt carried · n miles same as above

# raw thetis data
thetis_monitoring_method_a # bool
thetis_monitoring_method_b # bool
thetis_monitoring_method_c # bool
thetis_monitoring_method_d # bool
annual_monitoring_co2_emissions_assigned_to_passenger_transport # tonnes
annual_monitoring_co2_emissions_assigned_to_freight_transport # tonnes
annual_monitoring_total_co2_emissions # tonnes
annual_average_co2_emissions_per_transport_work_pax # g CO₂ / pax · n miles
annual_average_co2_emissions_per_transport_work_freight # g CO₂ / m tonnes · n miles
annual_average_co2_emissions_per_distance # kg CO2 / n miles
annual_monitoring_total_time_spent_at_sea # hours

# computed data
annual_computed_total_distance # nautical miles = annual_monitoring_total_co2_emissions * 1000 / annual_average_co2_emissions_per_distance
annual_computed_total_distance_km # km = annual_computed_total_distance * 1.852001
annual_computed_total_pax # pax = (annual_monitoring_co2_emissions_assigned_to_passenger_transport * 1000) / ((annual_average_co2_emissions_per_transport_work_pax / 1000) * annual_computed_total_distance)
annual_computed_total_freight # m tonnes =  (annual_monitoring_co2_emissions_assigned_to_freight_transport * 1000) / ((annual_average_co2_emissions_per_transport_work_freight / 1000) * annual_computed_total_distance)
annual_computed_average_speed # km/h = annual_computed_total_distance_km / annual_monitoring_total_time_spent_at_sea
annual_computed_ratio_emissions_assigned_to_passenger_transport # fraction = annual_monitoring_co2_emissions_assigned_to_passenger_transport / annual_monitoring_total_co2_emissions
