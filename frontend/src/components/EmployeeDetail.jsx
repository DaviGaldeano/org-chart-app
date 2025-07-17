import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { User, Mail, ArrowLeft, Building2 } from 'lucide-react'
import { useEmployee } from '@/hooks/useEmployee'
import AssignManager from './AssignManager'
import DirectReports from './DirectReports'
import Peers from './Peers'
import IndirectReports from './IndirectReports'

const HIERARCHY_LABELS = {
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior"
}

export default function EmployeeDetail() {
  const { employeeId } = useParams()
  const {
    data: employee,
    isLoading,
    isError,
    refetch,
  } = useEmployee(employeeId)

  if (isLoading) {
    return (
      <div className="container-main">
        <div className="card-elevated">
          <div className="loading-spinner"></div>
          <p className="text-center mt-4 text-muted-foreground">
            Carregando informações do colaborador...
          </p>
        </div>
      </div>
    )
  }

  if (isError || !employee) {
    return (
      <div className="container-main">
        <div className="card-elevated">
          <p className="text-center text-muted-foreground">
            Colaborador não encontrado
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-main">
      <div className="card-company w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                {employee.picture ? (
                  <img
                    src={employee.picture}
                    alt={`Foto de ${employee.name}`}
                    className="w-16 h-16 rounded-full object-cover border border-muted"
                  />
                ) : (
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="header-title">
                  {`${employee.name} (${HIERARCHY_LABELS[employee.hierarchy]})`}
                  </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{employee.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AssignManager employeeId={employeeId} onAssign={refetch} />
          <DirectReports employeeId={employeeId} employee={employee} />
          <Peers employeeId={employeeId} />
          <IndirectReports employeeId={employeeId} />
        </div>

        <div className="flex justify-end">
          <Link to={`/companies/${employee.company_id}`} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            <Building2 className="w-4 h-4" />
            Voltar para Empresa
          </Link>
        </div>
      </div>
    </div>
  )
}
