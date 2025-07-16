import React from 'react'
import { Link } from 'react-router-dom'
import { Users, User, ExternalLink } from 'lucide-react'
import { useDirectReports } from '@/hooks/useDirectReports'

export default function DirectReports({ employeeId }) {
  const { data: reports = [], isLoading, isError } = useDirectReports(employeeId)

  if (isLoading) {
    return (
      <div className="bg-background/30 rounded-lg p-4 border border-border/30">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Liderados diretos</h3>
        </div>
        <div className="loading-spinner w-6 h-6"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-background/30 rounded-lg p-4 border border-border/30 text-red-500">
        Erro ao carregar liderados diretos.
      </div>
    )
  }

  return (
    <div className="bg-background/30 rounded-lg p-4 border border-border/30">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Liderados diretos</h3>
        <span className="text-sm text-muted-foreground">({reports.length})</span>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Nenhum relatório direto</p>
        </div>
      ) : (
        <div className="space-y-2">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30 hover:border-border/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {report.picture ? (
                  <img
                    src={report.picture}
                    alt={`Foto de ${report.name}`}
                    className="w-8 h-8 mr-2 rounded-full object-cover border border-muted"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-muted-foreground">Relatório direto</div>
                </div>
              </div>
              <Link to={`/employees/${report.id}`} className="btn-ghost p-2">
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
