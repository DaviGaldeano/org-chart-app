# frozen_string_literal: true

class Employee < ApplicationRecord
  belongs_to :company
  belongs_to :manager, class_name: 'Employee', optional: true
  has_many :direct_reports,
           class_name: 'Employee',
           foreign_key: 'manager_id',
           dependent: :nullify,
           inverse_of: :manager

  enum :hierarchy, { junior: 1, pleno: 2, senior: 3 }

  validates :name, presence: true
  validates :hierarchy, presence: true
  validate :manager_must_have_higher_hierarchy

  private

  def manager_must_have_higher_hierarchy
    return if manager.nil?

    return unless manager.hierarchy_before_type_cast <= hierarchy_before_type_cast

    errors.add(:manager_id, 'deve ter nível hierárquico superior')
  end
end
