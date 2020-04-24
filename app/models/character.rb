# frozen_string_literal: true

class Character < ApplicationRecord
  belongs_to :room, inverse_of: :characters

  validates_uniqueness_of :name, scope: :room
end
