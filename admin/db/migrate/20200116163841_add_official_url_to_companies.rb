class AddOfficialUrlToCompanies < ActiveRecord::Migration[6.0]
  def change
    add_column :companies, :official_url, :string
  end
end
