# frozen_string_literal: true

# This migration creates the companies table
class CreateCompanies < ActiveRecord::Migration[7.1]
  def change
    create_table :companies do |t|
      t.string :name

      t.timestamps
    end
  end
end
