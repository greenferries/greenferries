class AddRoutesCountToShips < ActiveRecord::Migration[6.0]
  def change
    add_column :ships, :routes_count, :integer
    Ship.all.each{|s| Ship.reset_counters(s.id, :routes_count) }
  end
end
