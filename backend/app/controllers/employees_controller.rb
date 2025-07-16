# frozen_string_literal: true

# app/controllers/employees_controller.rb
class EmployeesController < ApplicationController
  before_action :set_employee, only: %i[destroy manager peers direct_reports indirect_reports]

  def index
    company = Company.find(params[:company_id])
    employees = company.employees
    render json: employees
  end

  def show
    employee = Employee.find_by(id: params[:id])
    if employee
      render json: employee
    else
      render json: { error: 'Employee not found' }, status: :not_found
    end
  end

  def create
    company = Company.find(params[:company_id])
    employee = company.employees.new(employee_params)

    if employee.save
      render json: employee, status: :created
    else
      render json: { errors: employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
    head :no_content
  end

  def manager
    return render_error('Manager must belong to the same company') unless same_company?

    return render_error('Cannot assign manager due to hierarchy loop') if check_hierarchy?(@employee, new_manager)

    @employee.manager = new_manager
    if @employee.save
      render json: @employee
    else
      render json: { errors: @employee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def peers
    if @employee.manager
      peers = @employee.manager.direct_reports.where.not(id: @employee.id)
      render json: peers
    else
      render json: []
    end
  end

  def candidates
    employee = Employee.find(params[:id])
    candidates = Employee.where(company_id: employee.company_id).where.not(id: employee.id)
    render json: candidates
  end

  def direct_reports
    render json: @employee.direct_reports
  end

  def indirect_reports
    indirects = @employee.direct_reports.flat_map(&:direct_reports)
    render json: indirects
  end

  private

  def same_company?
    new_manager.company_id == @employee.company_id
  end

  def render_error(msg)
    render json: { error: msg }, status: :unprocessable_entity
  end

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:name, :email, :picture)
  end

  def check_hierarchy?(employee, new_manager)
    current = new_manager
    while current
      Rails.logger.debug { "current.manager: #{current.manager.inspect}" }
      return true if current == employee

      current = current.manager
    end
    false
  end
end
