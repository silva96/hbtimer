# frozen_string_literal: true

class Character < ApplicationRecord
  belongs_to :room, inverse_of: :characters
  after_update :broadcast_amp

  validates_uniqueness_of :name, scope: :room

  scope :logged, -> { where(last_ping_at: 1.minute.ago..Time.zone.now) }

  scope :active, lambda {
    where(amp_timed_at: 2.minutes.ago..Time.zone.now)
      .order(amp_timed_at: :asc)
  }

  scope :less_active, lambda {
    where(amp_timed_at: 10.minutes.ago...2.minutes.ago)
      .order(amp_timed_at: :asc)
  }

  def amp_time_left
    time_left = 60 - (Time.zone.now.to_i - amp_timed_at.to_i)
    time_left.negative? ? '--' : time_left.to_s
  end

  def amp_color
    amp_time = amp_time_left.to_i
    return 'danger' if amp_time < 5
    return 'warning' if amp_time < 15

    'success'
  end

  def time_amp
    update(amp_timed_at: Time.zone.now)
  end

  def broadcast_amp
    return unless saved_changes.keys.include? 'amp_timed_at'

    RoomsChannel.broadcast_to(
      room.code, { character: name, amp: amp_time_left }
    )
  end
end
