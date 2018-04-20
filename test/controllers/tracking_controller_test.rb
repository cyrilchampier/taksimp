require 'test_helper'

class TrackingControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get tracking_show_url
    assert_response :success
  end

end
