import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User, Mail, Image, Plus, ArrowLeft, AlertCircle } from 'lucide-react'

const createEmployee = async ({ companyId, employee }) => {
  const res = await fetch(`/api/companies/${companyId}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employee }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.errors ? data.errors.join(', ') : 'Erro ao criar colaborador')
  }
  return res.json()
}

export default function EmployeeForm() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState([])
  const { companyId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => createEmployee({ companyId, employee: form }),
    onSuccess: () => {
      queryClient.invalidateQueries(['employees', companyId])
      navigate(`/companies/${companyId}`)
    },
    onError: (error) => {
      setErrors(error.message.split(', '))
    },
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    mutation.mutate()
  }

  return (
    <div className="container-main">
      <div className="card-company w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="header-title">Novo Colaborador</h1>
          <p className="text-muted-foreground">
            Adicione um novo colaborador à empresa
          </p>
        </div>

        {errors.length > 0 && (
          <div className="error-message">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="font-medium">Erro ao cadastrar</span>
            </div>
            {errors.map((error, index) => (
              <p key={index} className="text-sm">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-container">
          <div className="mb-6 relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-5 text-muted-foreground" />
            <input
              name="name"
              type="text"
              placeholder="Digite o nome completo"
              value={form.name}
              onChange={handleChange}
              required
              disabled={mutation.isLoading}
              className="w-full pr-4 py-2 pl-8 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-5 text-muted-foreground" />
            <input
              name="email"
              type="email"
              placeholder="Digite o email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={mutation.isLoading}
              className="w-full pr-4 py-2 pl-8 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
          </div>

          <div className="form-actions flex justify-between gap-2 mt-6">
            <button
              type="button"
              onClick={() => navigate(`/companies/${companyId}`)}
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
