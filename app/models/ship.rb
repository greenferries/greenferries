class Ship < ApplicationRecord
  belongs_to :company
  has_many :ship_routes
  has_many :routes, through: :ship_routes
  accepts_nested_attributes_for :ship_routes, allow_destroy: true
end
