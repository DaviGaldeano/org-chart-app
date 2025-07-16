# frozen_string_literal: true

# app/models/company.rb
class Company < ApplicationRecord
  has_many :employees, dependent: :destroy
  validates :name, presence: true
end
