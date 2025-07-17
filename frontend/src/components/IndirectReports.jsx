import React from 'react'
import { Users } from 'lucide-react'
import { useIndirectReports } from '@/hooks/useIndirectReports'
import { Link } from 'react-router-dom'

export default function IndirectReports({ employeeId }) {
  const { data: indirects = [], isLoading } = useIndirectReports(employeeId)

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
              <span className="text-muted-foreground ml-1 italic">
                — liderado por{' '}
                {
                  e.manager ? (
                    <Link to={`/employees/${e.manager.id}`} className="underline hover:text-primary">
                      {e.manager.name}
                    </Link>
                  ) : (
                    'desconhecido'
                  )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
