# frozen_string_literal: true

class RoomReflex < ApplicationReflex

  def suggest
    @suggestion_input = element[:value] if element[:value].present?
  end

  def add(data)
    enemy = data['enemy']
    name = data['name']
    room_id = data['room_id']
    character = Character.create_with(enemy: enemy)
                         .find_or_create_by(name: name, room_id: room_id)
    character.update(
      amp_timed_at: 61.seconds.ago,
      last_ping_at: 121.seconds.ago,
      enemy: enemy
    )
  end

  def repaint; end
end
