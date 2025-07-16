import React from 'react'
import { Users } from 'lucide-react'
import { usePeers } from '@/hooks/usePeers'

export default function Peers({ employeeId }) {
  const { data: peers = [], isLoading } = usePeers(employeeId)

  return (
    <div className="card-elevated">
      <h2 className="section-title mb-2 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Pares
      </h2>

      {isLoading
        ? (
          <p className="text-muted-foreground">Carregando pares...</p>
        ) : peers.length === 0 ? (
          <p className="text-muted-foreground italic">Sem pares cadastrados</p>
        ) : (
          <ul className="list-disc list-inside text-sm text-foreground">
            {peers.map((peer) => (
              <li key={peer.id}>
                {peer.name} ({peer.email})
              </li>
            ))}
          </ul>
        )}
    </div>
  )
}
