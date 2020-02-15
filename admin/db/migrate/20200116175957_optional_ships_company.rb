class OptionalShipsCompany < ActiveRecord::Migration[6.0]
  def change
    change_column_null :ships, :company_id, true
  end
end
