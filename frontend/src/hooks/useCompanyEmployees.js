import { useQuery } from '@tanstack/react-query'
import { fetchEmployees } from '@/api/employeeApi'

export function useCompanyEmployees(companyId) {
  return useQuery({
    queryKey: ['employees', companyId],
    queryFn: () => fetchEmployees(companyId),
    enabled: !!companyId,
    staleTime: 0,
  })
}
