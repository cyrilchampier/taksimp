require 'capybara/rails'
require 'capybara/rspec'

Capybara.register_driver :chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new(args: %w[no-sandbox headless disable-gpu])
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver =
  ENV['HEADLESS'] == '1' ? :chrome_headless : :selenium_chrome

# Puma is buggued (Error in reactor loop escaped: Invalid argument (Errno::EINVAL))
Capybara.server = :webrick
