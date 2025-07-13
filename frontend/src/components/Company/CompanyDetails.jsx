import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function CompanyDetail() {
  const { companyId } = useParams()
  const [company, setCompany] = useState(null)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/companies/${companyId}`)
      .then(res => res.json())
      .then(setCompany)

    fetch(`${import.meta.env.VITE_API_URL}/companies/${companyId}/employees`)
      .then(res => res.json())
      .then(setEmployees)
  }, [companyId])

  if (!company) return <div>Loading...</div>

  return (
    <div>
      <h1>{company.name}</h1>
      <h2>Employees</h2>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            <Link to={`/employees/${emp.id}`}>{emp.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Companies</Link>
    </div>
  )
}
