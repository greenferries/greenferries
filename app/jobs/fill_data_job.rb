class FillDataJob < ActiveJob::Base
  def perform(services=nil)
    services ||= ["thetis", "distance", "wikipedia_thumb", "thetis_computed_values"]
    DataFiller::Thetis.new.perform if services.include?("thetis")
    DataFiller::Distance.new.perform if services.include?("distance")
    DataFiller::WikipediaThumb.new.perform if services.include?("wikipedia_thumb")
    DataFiller::ShipsThetisComputedValues.new.perform if services.include?("thetis_computed_values")
  end
end
