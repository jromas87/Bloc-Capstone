class CreateProjectPhases < ActiveRecord::Migration
  def change
    create_table :project_phases do |t|
      t.string :name

      t.timestamps
    end
  end
end
