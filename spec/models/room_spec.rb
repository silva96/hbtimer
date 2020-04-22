# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Room, type: :model do
  it 'tests OK' do
    expect(build(:room).code).to eq('MyString')
  end
end
