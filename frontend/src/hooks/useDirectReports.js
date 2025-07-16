import { useQuery } from '@tanstack/react-query'
import { fetchDirectReports } from '@/api/employeeApi'

export function useDirectReports(employeeId) {
  return useQuery({
    queryKey: ['directReports', employeeId],
    queryFn: () => fetchDirectReports(employeeId),
    enabled: !!employeeId,
  })
}
