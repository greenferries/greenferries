class City < ApplicationRecord
  acts_as_mappable lat_column_name: :latitude, lng_column_name: :longitude

  validates_uniqueness_of :geonames_id

  scope :human_ordered, -> { order(:country, :name) }

  def to_s
    "#{country} - #{name}"
  end

  def self.collection_for_select
    c = {}
    City.human_ordered.each do |city|
      c[city.to_s] = city.id
    end
    c
  end
end
