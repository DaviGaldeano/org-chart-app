import { useQuery } from '@tanstack/react-query'
import { fetchCompanies } from '@/api/companyApi'

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  })
}
