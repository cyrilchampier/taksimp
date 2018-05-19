RSpec.describe "Tracking page", js: true do
  before do
    # User.make(email: 'user@example.com', password: 'password')
  end

  it 'shows task list' do
    visit '/tracking/show/'
    expect(page).to have_content('Tracking')
  end

  it 'do something else' do
  end
end