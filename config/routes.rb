Rails.application.routes.draw do
  root "static_pages#index"

  get '/facebook', to: "facebooks#index"
  post '/facebook', to: "facebooks#create"
  namespace :api, defaults: {format: :json} do

    # resource :facebook, only: [:index, :create]
    # resources :users, only: [:index, :show, :create, :update]
    # resource :session, only: [:show, :create, :destroy]

  end
end
