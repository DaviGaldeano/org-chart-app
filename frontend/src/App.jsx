import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import EmployeeDetail from './components/Employee/EmployeeDetail'
import CompanyDetail from './components/company/CompanyDetails'
import CompanyList from './components/company/CompanyList'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList />} />
        <Route path="/companies/:companyId" element={<CompanyDetail />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  )
}
