class TransformDoneInDoneOnForTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :done_on, :date
    # TODO: we cannot do that in SQLite, we should migrate to postgre
    # remove_column :tasks, :done
  end
end
