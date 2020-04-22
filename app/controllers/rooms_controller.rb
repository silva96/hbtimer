# frozen_string_literal: true

class RoomsController < ApplicationController
  before_action :set_room, only: [:show]

  def index
    @room = Room.new
  end

  def show; end

  # POST /rooms
  def create
    @room = Room.new(room_params)

    respond_to do |format|
      if @room.save
        format.html { redirect_to @room, notice: 'Room was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  private

  def set_room
    @room = Room.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def room_params
    params.require(:room).permit(:code)
  end
end
