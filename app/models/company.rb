class Company < ApplicationRecord
  has_one_attached :logo
  has_many :ships
  scope :in_scope, -> { where("ships_count > 0") }
  scope :human_ordered, -> { order(:name) }

  include HasWikipediaUrl

  def slug
    "#{name}-#{country}".parameterize
  end
end
