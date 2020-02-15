class AddShipsCountToCompanies < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :ships_count, :integer
    Company.all.each{ |c| Company.reset_counters(c.id, :ships_count) }
  end
end
