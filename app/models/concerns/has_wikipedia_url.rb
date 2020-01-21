module HasWikipediaUrl
  # extend ActiveSupport::Concern

  def wikipedia_mobile_url
    wikipedia_url&.gsub('.wikipedia', '.m.wikipedia')
  end
end
