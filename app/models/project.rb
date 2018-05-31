# Would the name "Category" be less confusing with "Task" and "Work" ?
class Project < ApplicationRecord
  has_many :tasks

  validates :color, presence: true, format: { with: /\A#[0-9A-Fa-f]{6}\z/, message: "should be a color 6 hexa (#FFFFFF)" }

end
