class Project < ApplicationRecord
  has_many :tasks

  validates :color, presence: true, format: { with: /\A#[0-9A-F]{6}\z/, message: "should be a color 6 hexa (#FFFFFF)" }

end
