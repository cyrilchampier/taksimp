class Work < ApplicationRecord
  belongs_to :task

  scope :pending, -> { where.not(done_on: nil) }
  scope :done, -> { where(done_on: nil) }

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
