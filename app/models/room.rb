# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :characters, inverse_of: :room, dependent: :destroy
  validates_length_of :code, minimum: 3, maximum: 15

  def admin
    characters.where(last_ping_at: 1.minute.ago..Time.zone.now)
              .order(:created_at)
              .first
  end
end
