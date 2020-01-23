class Ship < ApplicationRecord
  belongs_to :company, optional: true
  has_many :ship_routes
  has_many :routes, through: :ship_routes
  accepts_nested_attributes_for :ship_routes, allow_destroy: true

  scope :in_scope, -> { where(out_of_scope: [nil, false]) }
  scope :not_unknown_routes, -> { where(unknown_routes: [nil, false]) }
  scope :with_wikipedia_url, -> { where.not(wikipedia_url: nil) }
  scope :treatable, -> { in_scope.not_unknown_routes.with_wikipedia_url }

  scope :with_routes, -> { where('routes_count > 0') }
  scope :without_routes, -> { where(routes_count: 0) }

  scope :displayed, -> { in_scope.not_unknown_routes.with_routes }

  include HasWikipediaUrl

  def edit_url
    "http://admin.greenferries.org/ships/#{id}/edit"
  end
end
