class ShipRoute < ApplicationRecord
  belongs_to :ship, counter_cache: :routes_count
  belongs_to :route, counter_cache: :ships_count

  validates :ship, uniqueness: { scope: :route }
end
