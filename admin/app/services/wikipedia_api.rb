class WikipediaApi
  REGEX = /https:\/\/([a-z]+)\.wikipedia\.org\/wiki\/([^\/]+)/

  def initialize(wikipedia_url)
    _, @lang, @title = wikipedia_url.match(REGEX).to_a
  end

  def get_thumb_url(size)
    # cf https://stackoverflow.com/a/20311613
    url = "https://#{@lang}.wikipedia.org/w/api.php?action=query&titles=#{@title}&prop=pageimages&format=json&pithumbsize=#{size}"
    JSON.parse(Excon.get(url).body)['query']['pages'].values.first.dig('thumbnail', 'source')
  end
end
