export async function fetchCompany(companyId) {
  const res = await fetch(`/api/companies/${companyId}`)
  if (!res.ok) throw new Error('Failed to fetch company')
  return res.json()
}

export async function createCompany(newCompany) {
  const res = await fetch('/api/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company: newCompany }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.errors?.join(', ') || 'Failed to create company')
  }

  return res.json()
}

export async function fetchCompanies() {
  const res = await fetch('/api/companies')
  if (!res.ok) throw new Error('Erro ao carregar empresas')
  return res.json()
}
