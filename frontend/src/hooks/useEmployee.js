import { useQuery } from '@tanstack/react-query'
import { fetchEmployee } from '@/api/employeeApi'

export function useEmployee(employeeId) {
  return useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => fetchEmployee(employeeId),
    enabled: !!employeeId,
  })
}
