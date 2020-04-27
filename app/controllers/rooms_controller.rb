# frozen_string_literal: true

class RoomsController < ApplicationController
  before_action :set_room, only: [:show]

  def index
    @character_name = session[:character_name]
    @room = Room.new(code: params[:room_code] || session[:room_code])
  end

  def show
    if session[:character_name].nil? || session[:room_code].nil?
      redirect_to root_path
      return
    end
    if @suggestion_input
      @suggested_names = Character.select(:name)
                              .where('name LIKE ?', "%#{@suggestion_input}%")
                              .distinct.pluck(:name)
    else
      @suggested_names = []
    end

    @character = @room.characters.find_by(name: session[:character_name])
    @character.login
    @characters = @room.characters.active + @room.characters.less_active

    @characters -= [@character]
    @admin_name = @room.admin&.name || '--'
    @character.broadcast_amp unless @stimulus_reflex
  rescue StandardError => e
    Rails.logger.error(e)
    redirect_to root_path
  end

  # POST /rooms
  def create
    room_parameters = room_params.slice(:code)
    character_params = room_params.slice(:name)
    @room = Room.create_with(room_parameters)
                .find_or_create_by(code: room_parameters.fetch(:code))
    if @room.persisted?
      character = @room.characters
                       .create_with(character_params)
                       .find_or_create_by(name: character_params.fetch(:name))
      session[:character_name] = character.name
      session[:room_code] = @room.code
      redirect_to room_path
    else
      @character_name = character_params.fetch(:name)
      render :index
    end
  end

  private

  def set_room
    @room = Room.find_by(code: session[:room_code])
  end

  # Only allow a list of trusted parameters through.
  def room_params
    params.require(:room).permit(:code, :name)
  end
end
