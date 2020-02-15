class CreateRoutes < ActiveRecord::Migration[6.0]
  def change
    create_table :routes do |t|
      t.references :city_a, null: false, foreign_key: { to_table: :cities }
      t.references :city_b, null: false, foreign_key: { to_table: :cities }
      t.integer :distance_km

      t.timestamps
    end
  end
end
