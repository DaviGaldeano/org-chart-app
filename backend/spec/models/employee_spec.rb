# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Employee, type: :model do
  describe 'validations' do
    it 'is invalid without a name' do
      employee = described_class.new(email: 'a@b.com')
      expect(employee.valid?).to be false
    end

    it 'includes an error message for missing name' do
      employee = described_class.new(email: 'a@b.com')
      employee.valid? # força a validação para popular errors
      expect(employee.errors[:name]).to include("can't be blank")
    end
  end

  describe 'associations' do
    it 'belongs to a company' do
      company = Company.create!(name: 'CompX')
      employee = described_class.create!(name: 'Alice', email: 'a@x.com', company: company)
      expect(employee.company).to eq(company)
    end
  end

  describe 'hierarchy' do
    let(:company) { Company.create!(name: 'TestCo') }
    let(:manager) { described_class.create!(name: 'Manager', email: 'mgr@test.com', company: company) }
    let(:subordinate) do
      described_class.create!(name: 'Subordinate', email: 'sub@test.com', company: company, manager: manager)
    end

    it 'is invalid when manager assignment creates a loop' do
      manager.manager = subordinate
      expect(manager).not_to be_valid
    end

    it 'has error message for cyclic manager assignment' do
      manager.manager = subordinate
      manager.valid?
      expect(manager.errors[:manager_id]).to include('creates a loop in the hierarchy')
    end

    it 'allows valid manager assignment' do
      new_manager = described_class.create!(name: 'New Manager', email: 'newmgr@test.com', company: company)
      new_employee = described_class.new(name: 'New Employee', email: 'newemp@test.com', company: company,
                                         manager: new_manager)

      expect(new_employee).to be_valid
    end
  end
end
