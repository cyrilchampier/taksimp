class Project < ApplicationRecord
  has_many :tasks

  # TODO: validate color format: #FFFFFF
end
