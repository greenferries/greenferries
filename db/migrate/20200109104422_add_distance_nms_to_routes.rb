class AddDistanceNmsToRoutes < ActiveRecord::Migration[6.0]
  def change
    add_column :routes, :distance_nms, :float
  end
end
