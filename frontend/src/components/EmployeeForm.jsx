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
  const [form, setForm] = useState({ name: '', email: '', picture: '' })
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
      <div className="card-elevated w-full max-w-md">
        <div className="text-center mb-8">
          <div className="p-4 bg-primary/20 rounded-xl w-fit mx-auto mb-4">
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
          <div className="form-group">
            <label className="form-label">
              <User className="w-4 h-4 inline mr-2" />
              Nome Completo
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite o nome completo"
              className="input-modern w-full"
              required
              disabled={mutation.isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite o email"
              className="input-modern w-full"
              required
              disabled={mutation.isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Image className="w-4 h-4 inline mr-2" />
              Foto de Perfil (URL)
            </label>
            <input
              name="picture"
              type="url"
              value={form.picture}
              onChange={handleChange}
              placeholder="URL da foto de perfil (opcional)"
              className="input-modern w-full"
              disabled={mutation.isLoading}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Opcional: Cole o link de uma imagem para o perfil
            </p>
          </div>

          {form.picture && (
            <div className="form-group">
              <label className="form-label">Preview da Foto</label>
              <div className="flex justify-center">
                <img
                  src={form.picture}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

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
