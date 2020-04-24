class CreateCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.datetime :last_ping_at
      t.boolean :enemy
      t.datetime :amp_timed_at
      t.datetime :hp_timed_at
      t.datetime :mp_timed_at
      t.references :room, null: false, foreign_key: true

      t.timestamps
    end
  end
end
