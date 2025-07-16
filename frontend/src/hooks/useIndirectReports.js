import { useQuery } from '@tanstack/react-query'
import { fetchIndirectReports } from '@/api/employeeApi'

export function useIndirectReports(employeeId) {
  return useQuery({
    queryKey: ['indirectReports', employeeId],
    queryFn: () => fetchIndirectReports(employeeId),
    enabled: !!employeeId,
  })
}
