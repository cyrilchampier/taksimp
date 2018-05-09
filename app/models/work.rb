class Work < ApplicationRecord
  belongs_to :task

  scope :pending, -> { where(done_on: nil) }
  scope :done, -> { where.not(done_on: nil) }
  scope :done_on, -> (date) { where('DATE(done_on) = ?', date.to_date) }

  def self.past_days_done(days_count)
    # TODO: BUG: group_by does skip a day of no work present.
    # Plus, values removes the days, wich can be usefull
    where('DATE(done_on) > ?', days_count.days.ago.to_date)
      .group_by { |work| work.done_on.to_date }
      .values
  end

  def done?
    !!done_on
  end

  def color
    task&.color
  end

  def as_json(*)
    super.merge(color: color)
  end
end
