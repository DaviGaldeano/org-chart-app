import React, { useEffect, useState } from 'react'

export default function AssignManager({ employeeId, onAssign }) {
  const [candidates, setCandidates] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/api/employees/${employeeId}/peers`)
      .then(res => res.json())
      .then(setCandidates)
  }, [employeeId])

  const assign = () => {
    fetch(`http://localhost:3000/api/employees/${employeeId}/manager`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ manager_id: selected }),
    }).then(onAssign)
  }

  return (
    <div>
      <h3>Assign Manager</h3>
      <select onChange={e => setSelected(e.target.value)} defaultValue="">
        <option value="" disabled>Select manager</option>
        {candidates.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button onClick={assign} disabled={!selected}>Assign</button>
    </div>
  )
}
