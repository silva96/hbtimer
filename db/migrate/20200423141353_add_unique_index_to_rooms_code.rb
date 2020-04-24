class AddUniqueIndexToRoomsCode < ActiveRecord::Migration[6.0]
  def change
    add_index :rooms, :code, unique: true
  end
end
