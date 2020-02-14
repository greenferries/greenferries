class Route < ApplicationRecord
  belongs_to :city_a, class_name: 'City'
  belongs_to :city_b, class_name: 'City'
  has_many :ship_routes
  has_many :ships, through: :ship_routes

  validate :unique?

  def self.human_ordered
    joins('LEFT JOIN cities AS cities_a ON cities_a.id = city_a_id').
      joins('LEFT JOIN cities AS cities_b ON cities_b.id = city_b_id').
      order('cities_a.country, cities_a.name, cities_b.country, cities_b.name')
  end

  def to_s
    "#{city_a} - #{city_b}"
  end

  def slug
    "#{city_a.name}-#{city_a.country}-#{city_b.name}-#{city_b.country}".parameterize
  end

  def unique?
    if Route.where(city_a_id: city_a_id, city_b_id: city_b_id).
        or(Route.where(city_a_id: city_b_id, city_b_id: city_a)).
        where.not(id: id).
        any?
      errors.add(:city_a, 'Route already exists for these cities')
    end
  end

  def opposite_direction
    r = Route.new(attributes)
    r.id += 10000 # or indexeddb doesn't store it
    r.city_a = city_b
    r.city_b = city_a
    r
  end
end
