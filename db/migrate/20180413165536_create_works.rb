class CreateWorks < ActiveRecord::Migration[5.2]
  def change
    create_table :works do |t|
      t.references :task, foreign_key: true
      t.string :description
      t.date :done_on
      t.integer :day_percentage

      t.timestamps
    end
  end
end
