import React, { useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import AssignManager from './AssignManagers'
import DirectReports from './DirectReports'

export default function EmployeeDetail() {
  const { employeeId } = useParams()
  const [employee, setEmployee] = useState(null)

  const fetchEmployee = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employees/${employeeId}`)
      .then(res => res.json())
      .then(setEmployee)
  }, [employeeId])

  useEffect(() => {
    fetchEmployee()
  }, [fetchEmployee])

  if (!employee) return <div>Loading...</div>
  console.log('company id', employee.company_id)
  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Email: {employee.email}</p>
      <img src={employee.picture} alt={employee.name} width={64} />
      <AssignManager employeeId={employeeId} onAssign={fetchEmployee} />
      <DirectReports employeeId={employeeId} />
      <Link to={`/companies/${employee.company_id}`}>Back to Company</Link>
    </div>
  )
}
