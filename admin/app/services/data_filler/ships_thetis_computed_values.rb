class DataFiller::ShipsThetisComputedValues
  def initialize(scope='missing')
    @scope = scope
  end

  def perform
    ships.find_each { |ship| recompute_values_ship(ship) }
  end

  private

  def ships
    # TODO base on scope
    Ship.all
  end

  def recompute_values_ship(ship)
    ship.recompute_thetis_values
    ship.save!
  end
end
