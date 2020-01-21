class City < ApplicationRecord
  acts_as_mappable lat_column_name: :latitude, lng_column_name: :longitude

  validates_uniqueness_of :geonames_id

  def to_s
    "[#{country}] #{name}"
  end
end
