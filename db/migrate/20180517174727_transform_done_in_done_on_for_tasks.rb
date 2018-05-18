class TransformDoneInDoneOnForTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :done_on, :date
  end
end
