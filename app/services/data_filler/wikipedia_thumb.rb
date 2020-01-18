class DataFiller::WikipediaThumb
  def perform
    Ship.where(wikipedia_thumb_url: nil).where.not(wikipedia_url: nil).find_each do |ship|
      thumb_url = WikipediaApi.new(ship.wikipedia_url).get_thumb_url(300)
      if thumb_url.nil?
        puts "no image found for #{ship.wikipedia_url}"
      else
        ship.update!(wikipedia_thumb_url: thumb_url)
      end
    end
  end
end
