import { useQuery } from '@tanstack/react-query'
import { fetchCompany } from '@/api/companyApi'

export function useCompany(companyId) {
  return useQuery({
    queryKey: ['company', companyId],
    queryFn: () => fetchCompany(companyId),
    enabled: !!companyId,
    staleTime: 0,
  })
}
