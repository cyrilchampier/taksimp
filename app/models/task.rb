class Task < ApplicationRecord
  belongs_to :project

  # Should validate that sum(work.day_percentage) < 100
  has_many :works
end
