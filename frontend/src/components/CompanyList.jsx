import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Plus, Search, Building } from 'lucide-react'
import { useCompanies } from '@/hooks/useCompanies'

export default function CompanyList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: companies = [], isLoading, isError } = useCompanies()

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [companies, searchTerm])

  if (isLoading) {
    return (
      <div className="container-main">
        <div className="card-elevated">
          <div className="loading-spinner"></div>
          <p className="text-center mt-4 text-muted-foreground">Carregando empresas...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container-main">
        <div className="card-elevated text-center text-red-500">
          <p>Erro ao carregar as empresas.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-main">
      <div className="card-elevated w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="p-4 bg-primary/20 rounded-xl w-fit mx-auto mb-4">
            <Building className="w-8 h-8 text-primary" />
          </div>
          <h1 className="header-title">Empresas</h1>
          <p className="text-muted-foreground">
            {companies.length} empresa{companies.length !== 1 ? 's' : ''} cadastrada{companies.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-4 py-2 pl-8 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {filteredCompanies.length === 0
          ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {searchTerm
                  ? 'Nenhuma empresa encontrada'
                  : 'Nenhuma empresa cadastrada'}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {searchTerm
                  ? 'Tente buscar por outro termo'
                  : 'Cadastre a primeira empresa para começar'}
              </p>
            </div>
          ) : (
            <div className="list-modern mb-8">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="list-item transition-all duration-200 hover:shadow-md hover:bg-accent rounded-lg"
                >
                  <Link
                    to={`/companies/${company.id}`}
                    className="list-item-link flex items-center gap-3 p-4 flex-1"
                  >
                    <div
                      style={{ marginRight: '0.5rem' }}
                      className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"
                    >
                      <Building2 className="w-10 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-lg">{company.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Ver detalhes da empresa
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

        <div className="text-center">
          <Link to="/companies/new" className="btn-primary inline-flex">
            <Plus className="w-4 h-4" />
            Nova Empresa
          </Link>
        </div>
      </div>
    </div>
  )
}
