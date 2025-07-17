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
      render json: employee.as_json(include: {
                                      manager: {
                                        only: %i[id name hierarchy]
                                      }
                                    })
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
    new_manager = Employee.find(params[:manager_id])

    return render_error('Manager must belong to the same company') unless same_company?(new_manager)
    return render_error('Manager must have a higher hierarchy level') unless manager_has_higher_hierarchy?(new_manager,
                                                                                                           @employee)

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
    render json: indirects.as_json(include: { manager: { only: %i[id name] } }, only: %i[id name email])
  end

  private

  def same_company?(new_manager)
    new_manager.company_id == @employee.company_id
  end

  def render_error(msg)
    render json: { error: msg }, status: :unprocessable_entity
  end

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:name, :email, :picture, :hierarchy)
  end

  def manager_has_higher_hierarchy?(manager, employee)
    manager.hierarchy_before_type_cast > employee.hierarchy_before_type_cast
  end
end
