# config/initializers/blueprinter.rb
# cf https://github.com/procore/blueprinter/issues/158
module Blueprinter
  class Field
    def name
      @name.to_s.camelize(:lower)
    end
  end
end
