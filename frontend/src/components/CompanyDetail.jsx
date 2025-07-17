import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Building2, Users, Plus, ArrowLeft, Trash2, User } from 'lucide-react'
import { useCompany } from '@/hooks/useCompany'
import { useCompanyEmployees } from '@/hooks/useCompanyEmployees'
import { useDeleteEmployee } from '@/hooks/useDeleteEmployee'

const HIERARCHY_LABELS = {
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior"
}

export default function CompanyDetail() {
  const { id: companyId } = useParams()
  const navigate = useNavigate()
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null)

  const {
    data: company,
    isLoading: loadingCompany,
    isError: errorCompany,
    error: errorCompanyObj,
  } = useCompany(companyId)

  const {
    data: employees = [],
    isLoading: loadingEmployees,
    isError: errorEmployees,
    error: errorEmployeesObj,
  } = useCompanyEmployees(companyId)

  const mutation = useDeleteEmployee(
    companyId,
    () => alert('Colaborador removido com sucesso!'),
    (error) => alert('Erro ao remover colaborador: ' + error.message),
    () => setDeletingEmployeeId(null)
  )

  const deleteEmployee = (id) => {
    setDeletingEmployeeId(id)
    mutation.mutate(id)
  }

  if (loadingCompany || loadingEmployees) {
    return (
      <div className="container-main">
        <div className="card-elevated">
          <div className="loading-spinner"></div>
          <p className="text-center mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  if (errorCompany) {
    return (
      <div className="container-main">
        <div className="card-elevated text-center text-red-500">
          <p>Erro ao carregar dados da empresa: {errorCompanyObj.message}</p>
        </div>
      </div>
    )
  }

  if (errorEmployees) {
    return (
      <div className="container-main">
        <div className="card-elevated text-center text-red-500">
          <p>Erro ao carregar colaboradores: {errorEmployeesObj.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-main">
      <div className="card-company w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="header-title">{company?.name}</h1>
              <p className="text-muted-foreground">
                {employees.length} colaborador{employees.length !== 1 ? 'es' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-1">
              <Users className="w-5 h-5 text-primary" />
              Colaboradores
            </h2>
            <Link to={`/companies/${companyId}/employees/new`} className="btn-primary">
              <Plus className="w-4 h-4" />
              Novo Colaborador
            </Link>
          </div>

          {employees.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Nenhum colaborador cadastrado
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Adicione o primeiro colaborador para começar
              </p>
            </div>
          ) : (
            <div className="list-modern">
              {employees.map(emp => (
                <div key={emp.id} className="list-item flex items-center">
                  <Link
                    to={`/employees/${emp.id}`}
                    className="list-item-link flex items-center gap-3 pb-4 flex-1"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center" style={{ marginRight: '0.5rem' }}>
                      {emp.picture ? (
                        <img
                          src={emp.picture}
                          alt={`Foto de ${emp.name}`}
                          className="rounded-full object-cover border border-muted"
                        />
                      ) : (
                        <User className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{`${emp.name} (${HIERARCHY_LABELS[emp.hierarchy]})`}</div>
                      <div className="text-sm text-muted-foreground">{emp.email}</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    disabled={deletingEmployeeId === emp.id}
                    className="btn-destructive ml-4 flex items-center gap-1"
                  >
                    {deletingEmployeeId === emp.id ? (
                      <div className="loading-spinner w-4 h-4" />
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Remover
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate('/organizations')} className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}
