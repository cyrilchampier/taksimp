require 'test_helper'

class ConfigurationControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get configuration_show_url
    assert_response :success
  end

end
