class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :questions
      t.belongs_to :quiz
      t.timestamps
    end
  end
end
