class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.integer :imo
      t.string :wikipedia_url
      t.string :country

      t.timestamps
    end
  end
end
