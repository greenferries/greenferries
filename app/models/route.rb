class Route < ApplicationRecord
  belongs_to :city_a, class_name: 'City'
  belongs_to :city_b, class_name: 'City'
  has_many :ship_routes
  has_many :ships, through: :ship_routes

  def to_s
    "#{city_a} - #{city_b}"
  end
end
