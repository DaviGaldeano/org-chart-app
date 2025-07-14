import React, { useState } from 'react'
import { UserCheck, ChevronDown, CheckCircle } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

async function fetchPeers(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}/peers`)
  if (!res.ok) throw new Error('Failed to fetch peers')
  return res.json()
}

async function assignManager(employeeId, managerId) {
  const res = await fetch(`/api/employees/${employeeId}/manager`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ manager_id: managerId }),
  })
  if (!res.ok) throw new Error('Failed to assign manager')
  return res.json()
}

export default function AssignManager({ employeeId, onAssign }) {
  const [selected, setSelected] = useState(null)
  const queryClient = useQueryClient()

  const { data: candidates, isLoading } = useQuery(
    ['peers', employeeId],
    () => fetchPeers(employeeId),
    { enabled: !!employeeId }
  )

  const mutation = useMutation(
    (managerId) => assignManager(employeeId, managerId),
    {
      onSuccess: () => {
        onAssign()
        queryClient.invalidateQueries(['peers', employeeId])
      },
    }
  )

  const assign = () => {
    if (!selected) return
    mutation.mutate(selected)
  }

  if (isLoading) {
    return (
      <div className="bg-background/30 rounded-lg p-4 border border-border/30">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Atribuir Gerente</h3>
        </div>
        <div className="loading-spinner w-6 h-6"></div>
      </div>
    )
  }

  return (
    <div className="bg-background/30 rounded-lg p-4 border border-border/30">
      <div className="flex items-center gap-2 mb-4">
        <UserCheck className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Atribuir Gerente</h3>
      </div>

      {candidates.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Nenhum colega disponível para ser gerente
        </p>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <select
              onChange={e => setSelected(e.target.value)}
              value={selected || ''}
              className="input-modern w-full appearance-none pr-10"
              disabled={mutation.isLoading}
            >
              <option value="">Selecione um gerente</option>
              {candidates.map(candidate => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>

          <button
            onClick={assign}
            disabled={!selected || mutation.isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isLoading ? (
              <>
                <div className="loading-spinner w-4 h-4"></div>
                Atribuindo...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Atribuir Gerente
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
