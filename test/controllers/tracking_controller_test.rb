require 'test_helper'

class TrackingControllerTest < ActionDispatch::IntegrationTest
  test "should get today" do
    get tracking_today_url
    assert_response :success
  end

end
