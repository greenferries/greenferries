class CreateMissingShipsJob < ActiveJob::Base
  def perform
    GreenferriesApi.get_all_ships.each { |s| create_ship(s) }
  end

  def create_ship(data)
    return if Ship.where(imo: data['imo']).any?

    company = create_company(data)

    ship = Ship.create!(
      company: company,
      imo: data['imo'],
      name: data['name_wiki'] || data['name_thetis'],
      g_co2_per_mile_pax: data['annual_average_co2_emissions_per_transport_work_pax'],
      data_source: "THETIS-MRV-2019",
      wikipedia_url: data['wikipedia_url'],
      capacity_pax: data['capacity_pax']
    )
  end

  def create_company(data)
    if data['operator_name'].present?
      name = data['operator_name']
      url = data['operator_url']
      country = data['operator_country_code']
    else
      name = data['owner_name']
      url = data['owner_url']
      country = data['owner_country_code']
    end
    return nil if name.blank?

    Company.
      create_with(official_url: url, country: country).
      find_or_create_by(name: name)
  end
end
