import { useQuery } from '@tanstack/react-query'
import { fetchCandidates } from '@/api/employeeApi'

export function useCandidates(employeeId) {
  return useQuery({
    queryKey: ['candidates', employeeId],
    queryFn: () => fetchCandidates(employeeId),
    enabled: !!employeeId,
  })
}
