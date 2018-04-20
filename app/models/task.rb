class Task < ApplicationRecord
  belongs_to :tag

  # Should validate that sum(work.day_percentage) < 100
  has_many :works
end
