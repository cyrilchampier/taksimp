module Waiting
  def eventually(timeout: Capybara.default_max_wait_time, interval: 0.1)
    max_time = Capybara::Helpers.monotonic_time + timeout
    begin
      yield
    rescue StandardError, Minitest::Assertion
      # StandardError catch `assert_equal 'toto', Patient.last.name` that raises because Patient.last does not yet exist
      # Minitest::Assertion catches normal failed assertions
      raise if Capybara::Helpers.monotonic_time > max_time
      sleep interval
      retry
    end
  end
end

RSpec.configure do |c|
  c.include Waiting
end
