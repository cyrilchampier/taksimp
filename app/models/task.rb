class Task < ApplicationRecord
  belongs_to :project

  # Should validate that sum(work.day_percentage) < 100
  has_many :works
  
  scope :pending, -> { where(done_on: nil) }

  def color
    # TODO: should have a slight variation based on name
    project&.color
  end

  def as_json(*)
    super.merge(color: color)
  end
end
