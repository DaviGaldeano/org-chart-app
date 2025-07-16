# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Companies API', type: :request do
  describe 'GET /api/companies' do
    it 'returns status ok' do
      get '/api/companies'
      expect(response).to have_http_status(:ok)
    end

    it 'returns all companies' do
      get '/api/companies'
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
