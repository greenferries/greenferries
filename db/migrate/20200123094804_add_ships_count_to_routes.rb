class AddShipsCountToRoutes < ActiveRecord::Migration[6.0]
  def change
    add_column :routes, :ships_count, :integer
    Route.all.each{|s| Route.reset_counters(s.id, :ships_count) }
  end
end
