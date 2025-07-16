# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Employees API', type: :request do
  let!(:company) { Company.create!(name: 'Qulture') }

  describe 'GET /api/companies/:company_id/employees' do
    it 'returns all employees for a company' do
      company.employees.create!(name: 'Alice', email: 'alice@x.com')
      company.employees.create!(name: 'Bob', email: 'bob@x.com')

      get "/api/companies/#{company.id}/employees"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.length).to eq(2)
    end
  end

  describe 'POST /api/companies/:company_id/employees' do
    it 'creates an employee in a company' do
      post "/api/companies/#{company.id}/employees", params: {
        employee: {
          name: 'Charlie',
          email: 'charlie@x.com',
          picture: 'https://placekitten.com/200/200'
        }
      }

      expect(response).to have_http_status(:created)
      data = response.parsed_body
      expect(data['name']).to eq('Charlie')
    end
  end

  describe 'DELETE /api/employees/:id' do
    it 'deletes an employee (if no dependents)' do
      emp = company.employees.create!(name: 'ToDelete', email: 'delete@x.com')

      delete "/api/employees/#{emp.id}"

      expect(response).to have_http_status(:no_content)
      expect(Employee.find_by(id: emp.id)).to be_nil
    end
  end

  describe 'GET /api/employees/:id/peers' do
    it 'returns the peers of an employee' do
      manager = company.employees.create!(name: 'Manager', email: 'm@x.com')
      let(:manager) { described_class.create!(name: 'Manager', email: 'mgr@test.com', company: company) }
      let(:subordinate) do
        described_class.create!(name: 'Subordinate', email: 'sub@test.com', company: company, manager: manager)
      end

      get "/api/employees/#{emp1.id}/peers"

      expect(response).to have_http_status(:ok)
      data = response.parsed_body
      expect(data.map { |e| e['id'] }).to include(emp2.id)
      expect(data.map { |e| e['id'] }).not_to include(emp1.id)
    end
  end
end
