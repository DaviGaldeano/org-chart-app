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
  { name: 'Gerente', email: 'davi@gmail.com', picture: 'https://i.pravatar.cc/150?img=3', company: qulture },
  { name: 'LiderDoGerente', email: 'daviLiderDo@gmail.com', picture: 'https://i.pravatar.cc/150?img=25',
    company: qulture },
  { name: 'Colaborador', email: 'davi2@gmail.com', picture: 'https://i.pravatar.cc/150?img=10', company: qulture },
  { name: 'estagiário', email: 'daviss@gmail.com', picture: 'https://i.pravatar.cc/150?img=1', company: qulture },
  { name: 'LiderGerenteUol', email: 'da@gmail.com', picture: 'https://i.pravatar.cc/150?img=50', company: uol },
  { name: 'GerenteUol', email: 'galdeano@gmail.com', picture: 'https://i.pravatar.cc/150?img=15', company: uol },
  { name: 'ColaboradorUol', email: 'davissax@gmail.com', picture: 'https://i.pravatar.cc/150?img=16', company: uol }
]

# cria sem manager
employees = {}
employees_data.each do |attrs|
  employees[attrs[:email]] = Employee.create!(attrs)
end

Rails.logger.debug 'Updating manager relationships (step 2)...'

employees['davi@gmail.com'].update!(manager: employees['daviLiderDo@gmail.com'])
employees['davi2@gmail.com'].update!(manager: employees['davi@gmail.com'])
employees['daviss@gmail.com'].update!(manager: employees['davi2@gmail.com'])
employees['galdeano@gmail.com'].update!(manager: employees['da@gmail.com'])
employees['davissax@gmail.com'].update!(manager: employees['galdeano@gmail.com'])

Rails.logger.debug '✅ Seed concluído com sucesso!'
