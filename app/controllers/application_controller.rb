# frozen_string_literal: true

class ApplicationController < ActionController::Base
  default_form_builder BulmaFormBuilder
  before_action :set_action_cable_identifier

  private

  def set_action_cable_identifier
    cookies.encrypted[:session_id] = session.id.to_s
  end
end
