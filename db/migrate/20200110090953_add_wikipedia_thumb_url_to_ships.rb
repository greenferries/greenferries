class AddWikipediaThumbUrlToShips < ActiveRecord::Migration[6.0]
  def change
    add_column :ships, :wikipedia_thumb_url, :string
  end
end
