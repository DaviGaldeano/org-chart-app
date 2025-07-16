# frozen_string_literal: true

# app/models/employee.rb
class Employee < ApplicationRecord
  belongs_to :company
  belongs_to :manager, class_name: 'Employee', optional: true
  has_many :direct_reports,
           class_name: 'Employee',
           foreign_key: 'manager_id',
           dependent: :nullify,
           inverse_of: :manager

  validates :name, presence: true

  validate :manager_cannot_create_loop

  private

  def manager_cannot_create_loop
    current = manager
    while current
      if current == self
        errors.add(:manager_id, 'creates a loop in the hierarchy')
        break
      end
      current = current.manager
    end
  end
end
