import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Users } from 'lucide-react'

const fetchIndirectReports = async (employeeId) => {
  const res = await fetch(`/api/employees/${employeeId}/indirect_reports`)
  if (!res.ok) throw new Error('Erro ao carregar liderados indiretos')
  return res.json()
}

export default function IndirectReports({ employeeId }) {
  const { data: indirects = [], isLoading } = useQuery({
    queryKey: ['indirectReports', employeeId],
    queryFn: () => fetchIndirectReports(employeeId),
    enabled: !!employeeId,
  })

  return (
    <div className="card-elevated">
      <h2 className="section-title mb-2 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Liderados Indiretos
      </h2>
      {isLoading ? (
        <p className="text-muted-foreground">Carregando liderados...</p>
      ) : indirects.length === 0 ? (
        <p className="text-muted-foreground italic">Sem liderados indiretos</p>
      ) : (
        <ul className="list-disc list-inside text-sm text-foreground">
          {indirects.map((e) => (
            <li key={e.id}>
              {e.name} ({e.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
