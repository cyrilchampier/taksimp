class TranformWorkDescriptionToArray < ActiveRecord::Migration[5.2]
  def change
    add_column :works, :descriptions, :string, array: true, default: []
    Work.all.each { |work| work.update!(descriptions: [work.description]) }
    remove_column :works, :description
  end
end
