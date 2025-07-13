Rails.application.routes.draw do
  scope '/api' do
    resources :companies do
      resources :employees
    end
    resources :employees do
      member do
        patch :manager
        get :peers
        get :direct_reports
        get :indirect_reports
      end
    end
  end
end
