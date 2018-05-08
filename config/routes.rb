Rails.application.routes.draw do
  get 'tasks/create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  get 'configuration/show'
  get 'tracking/show'

  resources :tasks
  resources :works

  root 'tracking#show'
end
