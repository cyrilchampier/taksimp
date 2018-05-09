class Work < ApplicationRecord
  belongs_to :task

  scope :pending, -> { where(done_on: nil) }
  scope :done, -> { where.not(done_on: nil) }
  scope :done_on, -> (date) { where('DATE(done_on) = ?', date.to_date) }

  validate :day_proportions_coherent_this_day, if: :done?

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

  private

  def day_proportions_coherent_this_day
    works_done = Work.done_on(done_on.to_date)
    works_done = works_done.where.not(id: id) if id?
    percentage_left = 100 - works_done.pluck(:day_percentage).sum
    if percentage_left - day_percentage < 0
      errors[:day_percentage] << "Only Superman can work more than 100%, currently #{percentage_left}."
    end
  end
end
