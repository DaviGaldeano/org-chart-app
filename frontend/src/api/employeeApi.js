export async function fetchCandidates(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}/candidates`)
  if (!res.ok) throw new Error('Failed to fetch manager candidates')
  return res.json()
}

export async function assignManager(employeeId, managerId) {
  const res = await fetch(`/api/employees/${employeeId}/manager`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ manager_id: managerId }),
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData?.error || 'Failed to assign manager')
  }
  return res.json()
}

export async function fetchEmployees(companyId) {
  const res = await fetch(`/api/companies/${companyId}/employees`)
  if (!res.ok) throw new Error('Failed to fetch employees')
  return res.json()
}

export async function fetchEmployee(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}`)
  if (!res.ok) throw new Error('Erro ao carregar colaborador')
  return res.json()
}

export async function createEmployee({ companyId, employee }) {
  const res = await fetch(`/api/companies/${companyId}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employee }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.errors ? data.errors.join(', ') : 'Erro ao criar colaborador')
  }
  return res.json()
}

export async function deleteEmployeeById(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete employee')

  if (res.status === 204) return null
  return res.json()
}

export async function fetchDirectReports(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}/direct_reports`)
  if (!res.ok) throw new Error('Erro ao carregar Liderados diretos')
  return res.json()
}

export async function fetchIndirectReports(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}/indirect_reports`)
  if (!res.ok) throw new Error('Erro ao carregar liderados indiretos')
  return res.json()
}

export async function fetchPeers(employeeId) {
  const res = await fetch(`/api/employees/${employeeId}/peers`)
  if (!res.ok) throw new Error('Erro ao carregar pares')
  return res.json()
}

