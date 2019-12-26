class CreateShipsRoutesJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_table :ship_routes do |t|
      t.references :ship
      t.references :route
      t.timestamps
    end
  end
end
