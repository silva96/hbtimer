# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'rooms/show', type: :view do
  before(:each) do
    @room = assign(:room, Room.create!(
                            code: 'Code'
                          ))
  end

  it 'renders attributes in <p>' do
    render
    expect(rendered).to match(/Code/)
  end
end
