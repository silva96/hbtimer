# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'rooms/edit', type: :view do
  before(:each) do
    @room = assign(:room, Room.create!(
                            code: 'MyString'
                          ))
  end

  it 'renders the edit room form' do
    render

    assert_select 'form[action=?][method=?]', room_path(@room), 'post' do
      assert_select 'input[name=?]', 'room[code]'
    end
  end
end
