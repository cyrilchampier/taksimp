Rails.application.routes.draw do
  get 'tracking/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'tracking#show'
end
