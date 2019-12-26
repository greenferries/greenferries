class City < ApplicationRecord

  def to_s
    "[#{country}] #{name}"
  end
end
