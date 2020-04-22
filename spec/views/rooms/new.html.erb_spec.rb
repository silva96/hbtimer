# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'rooms/new', type: :view do
  before(:each) do
    assign(:room, Room.new(
                    code: 'MyString'
                  ))
  end

  it 'renders new room form' do
    render

    assert_select 'form[action=?][method=?]', rooms_path, 'post' do
      assert_select 'input[name=?]', 'room[code]'
    end
  end
end
