# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company, type: :model do
  it 'is valid with a name' do
    company = described_class.new(name: 'Test Company')
    expect(company).to be_valid
  end

  it 'is invalid without a name' do
    company = described_class.new(name: nil)
    expect(company.valid?).to be false
  end

  it 'includes error message for name' do
    company = described_class.new(name: nil)
    company.valid?
    expect(company.errors[:name]).to include("can't be blank")
  end

  it 'destroys its employees when deleted' do
    company = described_class.create!(name: 'DeleteMe Inc.')
    company.employees.create!(name: 'John Doe', email: 'john@example.com', hierarchy: 1)

    expect { company.destroy }.to change(Employee, :count).by(-1)
  end
end
