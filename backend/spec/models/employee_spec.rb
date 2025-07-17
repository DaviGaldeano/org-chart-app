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
      employee.valid?
      expect(employee.errors[:name]).to include("can't be blank")
    end
  end

  describe 'associations' do
    it 'belongs to a company' do
      company = Company.create!(name: 'CompX')
      employee = described_class.create!(name: 'Alice', email: 'a@x.com', company: company, hierarchy: 1)
      expect(employee.company).to eq(company)
    end
  end

  describe 'hierarchy' do
    let(:company) { Company.create!(name: 'TestCo') }
    let(:manager) { described_class.create!(name: 'Manager', email: 'mgr@test.com', company: company, hierarchy: 3) }
    let(:subordinate) do
      described_class.new(name: 'Subordinate', email: 'sub@test.com', company: company, manager: manager, hierarchy: 1)
    end

    it 'is invalid when manager has lower or equal hierarchy' do
      invalid_manager = described_class.new(name: 'Junior Manager', email: 'jm@test.com', company: company,
                                            hierarchy: 1)
      subordinate.manager = invalid_manager
      expect(subordinate.valid?).to be false
      expect(subordinate.errors[:manager_id]).to include('deve ter nível hierárquico superior')
    end

    it 'allows valid manager assignment' do
      expect(subordinate).to be_valid
    end
  end
end
