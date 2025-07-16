import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Plus, ArrowLeft, AlertCircle } from 'lucide-react'
import { useCreateCompany } from '@/hooks/useCreateCompany'

export default function CompanyForm() {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const mutation = useCreateCompany(
    (data) => navigate(`/companies/${data.id}`),
    (error) => setErrors([error.message])
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    mutation.mutate({ name })
  }

  return (
    <div className="container-main">
      <div className="card-company w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Crie uma nova empresa no sistema
          </p>
        </div>

        {errors.length > 0 && (
          <div className="error-message">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="font-medium">Erro ao cadastrar</span>
            </div>
            {errors.map((err, idx) => (
              <p key={idx} className="text-sm">{err}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <div className='mb-2'>
              <label className="form-label">Nome da Empresa</label>
            </div>

            <div className="relative mb-4">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-5 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome da empresa"
                required
                disabled={mutation.isLoading}
                className="w-full pr-4 py-2 pl-8 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="form-actions flex justify-between gap-2 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary px-4 py-2 text-md flex items-center gap-2"
              disabled={mutation.isLoading}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            <button
              type="submit"
              disabled={mutation.isLoading}
              className="btn-primary px-4 py-2 text-md flex items-center justify-center gap-2"
            >
              {mutation.isLoading ? (
                <>
                  <div className="loading-spinner w-4 h-4"></div>
                  Cadastrando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Cadastrar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
