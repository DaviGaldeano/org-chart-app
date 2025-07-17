import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { User, Mail, Image, Plus, ArrowLeft, AlertCircle } from 'lucide-react'
import { useCreateEmployee } from '@/hooks/useCreateEmployee'

export default function EmployeeForm() {
  const [errors, setErrors] = useState([])
  const [form, setForm] = useState({ name: '', email: '', picture: '' })
  const { companyId } = useParams()
  const navigate = useNavigate()

  const mutation = useCreateEmployee(
    companyId,
    (data) => navigate(`/employees/${data.id}`),
    (error) => setErrors(error.message.split(', '))
  )

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    mutation.mutate(form)
  }

  return (
    <div className="container-main">
      <div className="card-company w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <User className="w-8 h-8 text-primary" />
          </div>
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
          <div className="mb-4 relative">
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

          <div className="mb-4 relative">
            <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-5 text-muted-foreground" />
            <input
              name="picture"
              type="text"
              placeholder="URL da imagem (opcional)"
              value={form.picture}
              onChange={handleChange}
              disabled={mutation.isLoading}
              className="w-full pr-4 py-2 pl-8 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <select
              name="hierarchy"
              value={form.hierarchy}
              onChange={handleChange}
              disabled={mutation.isLoading}
              className="w-full pr-10 py-2 pl-3 px-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
            >
              <option value="">Selecione um nível hierárquico</option>
              <option value="junior">Júnior</option>
              <option value="pleno">Pleno</option>
              <option value="senior">Sênior</option>
            </select>
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
