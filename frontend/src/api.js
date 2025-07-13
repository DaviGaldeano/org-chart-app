const API = import.meta.env.VITE_API_URL

export async function fetchCompanies() {
  const response = await fetch(`${API}/companies`)
  if (!response.ok) throw new Error('Failed to fetch companies')
  return response.json()
}

export async function fetchCompany(id) {
  const response = await fetch(`${API}/companies/${id}`)
  if (!response.ok) throw new Error('Failed to fetch company')
  return response.json()
}
