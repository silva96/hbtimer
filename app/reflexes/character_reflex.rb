# frozen_string_literal: true

class CharacterReflex < ApplicationReflex
  def amp
    Character.find(element.dataset['character-id'])
             .update(amp_timed_at: Time.zone.now)
  end

  def cancel
    Character.find(element.dataset['character-id'])
             .update(amp_timed_at: 61.seconds.ago)
  end
end
