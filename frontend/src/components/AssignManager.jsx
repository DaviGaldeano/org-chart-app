import React, { useState } from 'react'
import { UserCheck, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCandidates } from '@/hooks/useCandidates'
import { useAssignManager } from '@/hooks/useAssignManager'

const HIERARCHY_LABELS = {
  junior: "Júnior",
  pleno: "Pleno",
  senior: "Sênior"
}

export default function AssignManager({ employeeId, manager, onAssign }) {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()
  const { data: candidates = [], isLoading } = useCandidates(employeeId)

  const mutation = useAssignManager(
    employeeId,
    (managerId) => {
      onAssign()
      navigate(`/employees/${managerId}`)
    },
    (error) => {
      const message = error?.response?.data?.error || 'Hierarquia abaixo não permite atribuição de gestor'
      alert(message)
    }
  )

  const assign = () => {
    if (!selected) return
    mutation.mutate(selected)
  }

  return (
    <div className="bg-background/30 rounded-lg p-4 border border-border/30">
      <div className="flex items-center gap-2 mb-4">
        <UserCheck className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">
          {manager
            ? `Gestor atribuído: ${manager.name} (${HIERARCHY_LABELS[manager.hierarchy]})`
            : "Atribuir Gestor"}
        </h3>
      </div>

      {isLoading ? (
        <div className="loading-spinner w-6 h-6" />
      ) : candidates.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Nenhum colaborador disponível para ser gestor
        </p>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <select
              onChange={e => setSelected(e.target.value)}
              value={selected || ''}
              className="w-full pr-10 py-2 pl-3 px-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
              disabled={mutation.isLoading}
            >
              <option value="">Selecione um novo gestor</option>
              {candidates.map(candidate => (
                <option key={candidate.id} value={candidate.id}>
                  {`${candidate.name} (${HIERARCHY_LABELS[candidate.hierarchy]})`}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={assign}
            disabled={!selected || mutation.isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isLoading ? (
              <>
                <div className="loading-spinner w-4 h-4" />
                Atribuindo...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                {manager ? "Alterar Gestor" : "Atribuir Gestor"}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
