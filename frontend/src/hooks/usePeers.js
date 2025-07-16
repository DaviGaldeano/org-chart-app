import { useQuery } from '@tanstack/react-query'
import { fetchPeers } from '@/api/employeeApi'

export function usePeers(employeeId) {
  return useQuery({
    queryKey: ['peers', employeeId],
    queryFn: () => fetchPeers(employeeId),
    enabled: !!employeeId,
  })
}
