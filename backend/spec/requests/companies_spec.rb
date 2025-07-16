# frozen_string_literal: true

require 'rails_helper'
# spec/requests/companies_spec.rb
RSpec.describe 'Companies API', type: :request do
  describe 'GET /api/companies' do
    before do
      Company.create!(name: 'Company A')
      Company.create!(name: 'Company B')
    end

    it 'returns all companies' do
      get '/api/companies'
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.size).to eq(2)
    end
  end

  describe 'POST /api/companies' do
    it 'creates a new company' do
      post '/api/companies', params: { company: { name: 'NovaCo' } }

      expect(response).to have_http_status(:created)
      expect(response.parsed_body['name']).to eq('NovaCo')
    end
  end
end
