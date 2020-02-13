class Ship < ApplicationRecord
  belongs_to :company, optional: true, counter_cache: :ships_count
  has_many :ship_routes
  has_many :routes, through: :ship_routes
  accepts_nested_attributes_for :ship_routes, allow_destroy: true

  scope :in_scope, -> { where(out_of_scope: [nil, false]) }
  scope :not_unknown_routes, -> { where(unknown_routes: [nil, false]) }
  scope :with_wikipedia_url, -> { where.not(wikipedia_url: [nil, '']) }
  scope :with_g_co2_per_mile_pax, -> { where.not(thetis_average_co2_per_pax: nil) }
  scope :treatable, -> { in_scope.not_unknown_routes.with_wikipedia_url }

  scope :with_routes, -> { where('routes_count > 0') }
  scope :without_routes, -> { where(routes_count: 0) }
  scope :displayed, -> { in_scope.not_unknown_routes.with_routes }
  scope :with_company, -> { where.not(company: nil) }
  scope :in_scope, -> { where(out_of_scope: nil).or(where(out_of_scope: false)) }

  include HasWikipediaUrl

  def edit_url
    "http://admin.greenferries.org/ships/#{id}/edit"
  end

  def slug
    "#{name}-#{imo}".parameterize
  end

  def recompute_thetis_values
    return if thetis_annual_co2_total.nil? || thetis_average_co2_per_distance.nil?
    self.thetis_annual_computed_distance = thetis_annual_co2_total * 1000 / thetis_average_co2_per_distance
    self.thetis_annual_computed_distance_km = thetis_annual_computed_distance * 1.852001
    if thetis_annual_co2_pax.present? && thetis_average_co2_per_pax
      self.thetis_annual_computed_pax =(thetis_annual_co2_pax * 1000) / ((thetis_average_co2_per_pax / 1000) * thetis_annual_computed_distance)
    end
    if thetis_annual_co2_freight.present? && thetis_average_co2_per_freight.present?
      self.thetis_annual_computed_freight =  (thetis_annual_co2_freight * 1000) / ((thetis_average_co2_per_freight / 1000) * thetis_annual_computed_distance)
    end
    if thetis_annual_hours_at_sea.present?
      self.thetis_annual_computed_average_speed = thetis_annual_computed_distance_km / thetis_annual_hours_at_sea
    end
    if thetis_annual_co2_pax.present?
      self.thetis_annual_computed_ratio_co2_from_pax = thetis_annual_co2_pax / thetis_annual_co2_total
    end
  end
end
