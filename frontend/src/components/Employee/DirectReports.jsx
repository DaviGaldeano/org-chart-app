import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DirectReports({ employeeId }) {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/employees/${employeeId}/direct_reports`)
      .then(res => res.json())
      .then(setReports)
  }, [employeeId])

  return (
    <div>
      <h3>Direct Reports</h3>
      <ul>
        {reports.map(r => (
          <li key={r.id}>
            <Link to={`/employees/${r.id}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
