class FillDataJob < ActiveJob::Base
  def perform(services=nil)
    services ||= ["thetis", "distance"]
    DataFiller::Thetis.new.perform if services.include?("thetis")
    DataFiller::Distance.new.perform if services.include?("distance")
  end
end
