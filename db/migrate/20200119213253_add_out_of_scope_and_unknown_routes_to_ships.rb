class AddOutOfScopeAndUnknownRoutesToShips < ActiveRecord::Migration[6.0]
  def change
    add_column :ships, :out_of_scope, :boolean
    add_column :ships, :unknown_routes, :boolean
  end
end
