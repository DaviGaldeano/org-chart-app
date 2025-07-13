import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function CompanyList() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/companies`)
      .then(res => res.json())
      .then(setCompanies)
  }, [])

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            <Link to={`/companies/${company.id}`}>{company.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
