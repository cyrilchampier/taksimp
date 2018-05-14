class Work < ApplicationRecord
  belongs_to :task

  scope :pending, -> { where(done_on: nil) }
  scope :done, -> { where.not(done_on: nil) }
  scope :done_on, -> (date) { where('DATE(done_on) = ?', date.to_date) }

  validate :day_percentages_coherent_this_day, if: :done?

  def self.done_between(start_date, stop_date)
    start_date, stop_date = stop_date, start_date if start_date > stop_date
    works_done_grouped =
      Work
        .where('DATE(done_on) >= ?', start_date.to_date)
        .where('DATE(done_on) <= ?', stop_date.to_date)
        .group_by { |work| work.done_on.to_date }
    (start_date..stop_date)
      .map { |day| [day, works_done_grouped[day] || []] }
      .map { |day, works| { date: day, works: works } }
  end

  def done?
    !!done_on
  end

  def name
    task&.name
  end

  def color
    task&.color
  end

  def as_json(*)
    super.merge(name: name, color: color)
  end

  private

  def day_percentages_coherent_this_day
    works_done = Work.done_on(done_on.to_date)
    works_done = works_done.where.not(id: id) if id?
    percentage_already_done = works_done.pluck(:day_percentage).sum
    if percentage_already_done + day_percentage > 100
      errors[:day_percentage] <<
        "Only Superman can work more than 100%, currently #{percentage_already_done}%, cannot add #{day_percentage}%."
    end
  end
end
