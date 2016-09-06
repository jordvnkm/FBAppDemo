Rails.application.routes.draw do
  root "static_pages#index"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :show, :create, :update]
    

  end
end
