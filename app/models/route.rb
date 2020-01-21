class Route < ApplicationRecord
  belongs_to :city_a, class_name: 'City'
  belongs_to :city_b, class_name: 'City'
  has_many :ship_routes
  has_many :ships, through: :ship_routes

  def self.human_ordered
    joins('LEFT JOIN cities AS cities_a ON cities_a.id = city_a_id').
      joins('LEFT JOIN cities AS cities_b ON cities_b.id = city_b_id').
      order('cities_a.country, cities_a.name, cities_b.country, cities_b.name')
  end

  def to_s
    "#{city_a} - #{city_b}"
  end
end
