class Route < ApplicationRecord
  belongs_to :city_a, class_name: 'City'
  belongs_to :city_b, class_name: 'City'
  has_and_belongs_to_many :ships

  def to_s
    "#{city_a} - #{city_b}"
  end
end
