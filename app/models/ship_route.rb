class ShipRoute < ApplicationRecord
  belongs_to :ship, counter_cache: :routes_count
  belongs_to :route, counter_cache: :ships_count

  validates :ship, uniqueness: { scope: :route }

  def opposite_direction
    sr = ShipRoute.new(attributes)
    sr.route = sr.route.opposite_direction
    sr
  end
end
