# frozen_string_literal: true

Rails.logger.debug 'Seeding companies...'
companies_data = [
  { name: 'Qulture Co.' },
  { name: 'Uol' }
]

companies = companies_data.map { |attrs| Company.create!(attrs) }
qulture, uol = companies

Rails.logger.debug 'Seeding employees (step 1 - without managers)...'

employees_data = [
  { name: 'Alice Johnson', email: 'alice@qulture.com', picture: 'https://i.pravatar.cc/150?img=3', company: qulture,
    hierarchy: 3 },
  { name: 'Bob Smith', email: 'bob@qulture.com', picture: 'https://i.pravatar.cc/150?img=25', company: qulture,
    hierarchy: 2 },
  { name: 'Charlie Lee', email: 'charlie@qulture.com', picture: 'https://i.pravatar.cc/150?img=10', company: qulture,
    hierarchy: 1 },
  { name: 'Dana White', email: 'dana@qulture.com', picture: 'https://i.pravatar.cc/150?img=1', company: qulture,
    hierarchy: 1 },
  { name: 'Eve Black', email: 'eve@uol.com', picture: 'https://i.pravatar.cc/150?img=50', company: uol, hierarchy: 3 },
  { name: 'Frank Green', email: 'frank@uol.com', picture: 'https://i.pravatar.cc/150?img=15', company: uol,
    hierarchy: 2 },
  { name: 'Grace Kim', email: 'grace@uol.com', picture: 'https://i.pravatar.cc/150?img=16', company: uol, hierarchy: 1 }
]

# cria sem manager
employees = {}
employees_data.each do |attrs|
  employees[attrs[:email]] = Employee.create!(attrs)
end

Rails.logger.debug 'Updating manager relationships (step 2)...'

employees['bob@qulture.com'].update!(manager: employees['alice@qulture.com'])
employees['charlie@qulture.com'].update!(manager: employees['bob@qulture.com'])
employees['dana@qulture.com'].update!(manager: employees['bob@qulture.com'])

employees['frank@uol.com'].update!(manager: employees['eve@uol.com'])
employees['grace@uol.com'].update!(manager: employees['frank@uol.com'])

Rails.logger.debug '✅ Seed concluído com sucesso!'
