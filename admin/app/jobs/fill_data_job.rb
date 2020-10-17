class FillDataJob < ActiveJob::Base
  def perform(services = nil)
    services ||= %w[thetis distance wikipedia_thumb]
    DataFiller::Thetis.new.perform if services.include?("thetis")
    DataFiller::Distance.new.perform if services.include?("distance")
    DataFiller::WikipediaThumb.new.perform if services.include?("wikipedia_thumb")
  end
end
