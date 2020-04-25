# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :characters, inverse_of: :room, dependent: :destroy
  validates_length_of :code, minimum: 3, maximum: 15

  def admin
    characters.logged
              .order(:created_at)
              .first
  end
end
