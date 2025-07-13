import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import EmployeeDetail from './components/Company/EmployeeDetail'
import CompanyDetail from './components/Company/CompanyDetail'
import CompanyList from './components/Company/CompanyList'

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Companies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/companies/:companyId" element={<CompanyDetail />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  )
}
