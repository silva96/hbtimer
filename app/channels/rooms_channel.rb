# frozen_string_literal: true

class RoomsChannel < ApplicationCable::Channel
  def subscribed
    room = Room.find_by(code: params[:code])
    stream_for room.code
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    Character.where(id: data['character_id'])
             .update_all(last_ping_at: Time.zone.now)
  end
end
