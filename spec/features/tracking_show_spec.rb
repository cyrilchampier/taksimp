RSpec.describe "Tracking page", js: true do
  it 'shows task list' do
    visit '/tracking/show/'
    expect(page).to have_content('Tracking')
  end

  context 'with some existing works' do
    before { Timecop.freeze '10-02-1984' }
    let!(:work_todo) { create :work, descriptions: ['Do the kitchen'] }
    let!(:work_done) { create :work, descriptions: ['Do the restroom'], done_on: Date.today }
    let!(:work_done_3_days_ago) { create :work, descriptions: ['Do the living room'], done_on: 3.days.ago }

    it 'displays works in right row' do
      visit '/tracking/show/'
      within find('.ts-day-works', text: 'TODO') { assert_text 'Do the kitchen' }
      within find('.ts-day-works', text: 'DONE') { assert_text 'Do the restroom' }
      within find('.ts-day-works', text: '1984-02-07') { assert_text 'Do the living room' }

      Timecop.travel 1.day

      visit '/tracking/show/'
      within find('.ts-day-works', text: 'TODO') { assert_text 'Do the kitchen' }
      within find('.ts-day-works', text: '1984-02-09') { assert_text 'Do the restroom' }
      within find('.ts-day-works', text: '1984-02-06') { assert_text 'Do the living room' }
    end
  end

  describe 'delete button' do
    let!(:work_todo) { create :work, descriptions: ['Do the kitchen'] }
    let!(:work_done) { create :work, descriptions: ['Do the restroom'], done_on: Date.today }

    it 'deletes todo works' do
      visit '/tracking/show/'
      find('.ts-day-works', text: 'TODO').find('.ts-work .close').click
      within find('.ts-day-works', text: 'TODO') { assert_no_text 'Do the kitchen' }
      refute Work.exists?(work_todo.id)
    end

    it 'deletes done works' do
      visit '/tracking/show/'
      find('.ts-day-works', text: 'DONE').find('.ts-work .close').click
      within find('.ts-day-works', text: 'DONE') { assert_no_text 'Do the restroom' }
      refute Work.exists?(work_done.id)
    end
  end
end