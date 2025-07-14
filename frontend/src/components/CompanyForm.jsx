import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Plus, ArrowLeft, AlertCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

async function createCompany(newCompany) {
  const res = await fetch('/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company: newCompany }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.errors?.join(', ') || 'Failed to create company')
  }

  return res.json()
}

export default function CompanyForm() {
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['companies'])
      navigate(`/companies/${data.id}`)
    },
    onError: (error) => {
      setErrors([error.message])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    mutation.mutate({ name })
  }

  return (
    <div className="container-main">
      <div className="card-elevated w-full max-w-md">
        <div className="text-center mb-8">
          <div className="p-4 bg-primary/20 rounded-xl w-fit mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="header-title">Cadastrar Empresa</h1>
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
            <label className="form-label">
              Nome da Empresa
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-modern w-full"
              placeholder="Digite o nome da empresa"
              required
              disabled={mutation.isLoading}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="btn-primary flex-1"
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

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
              disabled={mutation.isLoading}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
