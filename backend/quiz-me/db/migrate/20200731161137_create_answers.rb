class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.string :text
      t.boolean :correct
      t.belongs_to :question
      t.timestamps
    end
  end
end
