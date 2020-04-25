# frozen_string_literal: true

class AddIndexToColumnsInCharacter < ActiveRecord::Migration[6.0]
  def change
    add_index :characters, :amp_timed_at
    add_index :characters, :last_ping_at
  end
end
