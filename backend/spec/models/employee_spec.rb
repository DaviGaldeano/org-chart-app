require 'rails_helper'

RSpec.describe Employee, type: :model do
  it "validates presence of name" do
    employee = Employee.new(email: 'a@b.com')
    expect(employee.valid?).to be false
    expect(employee.errors[:name]).to include("can't be blank")
  end

  it "does not allow loops in manager assignment" do
    company = Company.create!(name: 'TestCo')
    e1 = Employee.create!(name: 'E1', email: 'e1@test.com', company: company)
    e2 = Employee.create!(name: 'E2', email: 'e2@test.com', company: company, manager: e1)

    e1.manager = e2

    expect(e1.valid?).to be false
    expect(e1.errors[:manager_id]).to include("creates a loop in the hierarchy")
  end
end
