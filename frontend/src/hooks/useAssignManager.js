import { useMutation, useQueryClient } from '@tanstack/react-query'
import { assignManager } from '@/api/employeeApi'

export function useAssignManager(employeeId, onSuccessCallback, onErrorCallback) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (managerId) => assignManager(employeeId, managerId),
    onSuccess: (_data, managerId) => {
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] })
      onSuccessCallback(managerId)
    },
    onError: (error) => {
      onErrorCallback(error)
    }
  })
}
