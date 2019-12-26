class CreateShips < ActiveRecord::Migration[6.0]
  def change
    create_table :ships do |t|
      t.integer :imo
      t.string :name
      t.references :company, null: false, foreign_key: true
      t.integer :capacity_pax
      t.string :wikipedia_url
      t.float :g_co2_per_mile_pax
      t.string :data_source

      t.timestamps
    end
  end
end
