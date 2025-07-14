# frozen_string_literal: true

# Clean up previous data
Employee.destroy_all
Company.destroy_all

# Criação de uma empresa
company = Company.create!(name: 'Qulture Co.')

# Criação dos colaboradores (sem gestor no começo)
ceo = Employee.create!(name: 'Alice CEO', email: 'alice@qulture.co', picture: '', company: company)
cto = Employee.create!(name: 'Bruno CTO', email: 'bruno@qulture.co', picture: '', company: company)
cmo = Employee.create!(name: 'Carla CMO', email: 'carla@qulture.co', picture: '', company: company)
dev = Employee.create!(name: 'Daniel Dev', email: 'daniel@qulture.co', picture: '', company: company)
designer = Employee.create!(name: 'Elisa Designer', email: 'elisa@qulture.co', picture: '', company: company)

# Atualiza os gestores (evita erro de loop na criação)
cto.update!(manager: ceo)
cmo.update!(manager: ceo)
dev.update!(manager: cto)
designer.update!(manager: cmo)

puts "Seeded #{Employee.count} employees for company '#{company.name}'"
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
