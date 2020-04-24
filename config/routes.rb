# frozen_string_literal: true

Rails.application.routes.draw do
  root 'rooms#index'
  post '/', to: 'rooms#create', as: :rooms
  get 'smack-them', to: 'rooms#show', as: :room
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
