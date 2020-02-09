class Ship < ApplicationRecord
  belongs_to :company, optional: true, counter_cache: :ships_count
  has_many :ship_routes
  has_many :routes, through: :ship_routes
  accepts_nested_attributes_for :ship_routes, allow_destroy: true

  scope :in_scope, -> { where(out_of_scope: [nil, false]) }
  scope :not_unknown_routes, -> { where(unknown_routes: [nil, false]) }
  scope :with_wikipedia_url, -> { where.not(wikipedia_url: [nil, '']) }
  scope :with_g_co2_per_mile_pax, -> { where.not(g_co2_per_mile_pax: nil) }
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
end
