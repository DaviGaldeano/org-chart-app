# frozen_string_literal: true

class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :email
      t.string :picture
      t.references :company, null: false, foreign_key: true
      t.references :manager, foreign_key: { to_table: :employees }

      t.timestamps
    end
  end
end
