# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Employees API', type: :request do
  let(:company) { Company.create!(name: 'Test Company') }

  let(:manager)   { company.employees.create!(name: 'Manager', email: 'manager@test.com', hierarchy: 3) }
  let(:mid_level) do
    company.employees.create!(name: 'Mid Level', email: 'midlevel@test.com', hierarchy: 2, manager: manager)
  end
  let(:junior_one) do
    company.employees.create!(name: 'Junior One', email: 'junior1@test.com', hierarchy: 1, manager: mid_level)
  end
  let(:junior_two) do
    company.employees.create!(name: 'Junior Two', email: 'junior2@test.com', hierarchy: 1, manager: mid_level)
  end

  describe 'GET /api/employees/:id/indirect_reports' do
    before do
      manager
      mid_level
      junior_one
      junior_two
    end

    it 'returns HTTP status ok' do
      get "/api/employees/#{manager.id}/indirect_reports"
      expect(response).to have_http_status(:ok)
    end

    it 'returns the correct number of indirect reports' do
      get "/api/employees/#{manager.id}/indirect_reports"
      expect(response.parsed_body.size).to eq(2)
    end

    it 'includes required fields for reports' do
      get "/api/employees/#{manager.id}/indirect_reports"
      reports = response.parsed_body

      expect(reports.first).to include('id', 'name', 'email', 'manager')
    end

    it 'includes the correct manager data for reports' do
      get "/api/employees/#{manager.id}/indirect_reports"
      reports = response.parsed_body

      expect(reports.first['manager']).to include('id' => mid_level.id, 'name' => mid_level.name)
    end
  end

  describe 'PATCH /api/employees/:id/manager' do
    let(:company) { Company.create!(name: 'Test Company') }
    let(:employee) { company.employees.create!(name: 'Employee', email: 'employee@test.com', hierarchy: 1) }

    context 'with valid manager assignment' do
      let(:manager) { company.employees.create!(name: 'Manager', email: 'manager@test.com', hierarchy: 3) }

      before do
        patch "/api/employees/#{employee.id}/manager", params: { manager_id: manager.id }
      end

      it 'returns status ok' do
        expect(response).to have_http_status(:ok)
      end

      it 'updates the manager' do
        expect(employee.reload.manager).to eq(manager)
      end
    end

    context 'with manager of lower or equal hierarchy' do
      let(:manager) { company.employees.create!(name: 'Manager', email: 'manager@test.com', hierarchy: 1) }

      before do
        patch "/api/employees/#{manager.id}/manager", params: { manager_id: employee.id }
      end

      it 'returns unprocessable_entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns hierarchy error message' do
        expect(response.parsed_body['error']).to eq('Manager must have a higher hierarchy level')
      end
    end

    context 'with manager from another company' do
      let(:other_company) { Company.create!(name: 'Other Company') }
      let(:external_manager) do
        other_company.employees.create!(name: 'External Manager', email: 'external@test.com', hierarchy: 3)
      end

      before do
        patch "/api/employees/#{employee.id}/manager", params: { manager_id: external_manager.id }
      end

      it 'returns unprocessable_entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns company error message' do
        expect(response.parsed_body['error']).to eq('Manager must belong to the same company')
      end
    end
  end
end
