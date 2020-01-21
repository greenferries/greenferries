class Company < ApplicationRecord
  has_one_attached :logo
  include HasWikipediaUrl
end
