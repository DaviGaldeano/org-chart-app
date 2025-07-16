import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEmployeeById } from '@/api/employeeApi'

export function useDeleteEmployee(companyId, onSuccess, onError, onSettled) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (employeeId) => deleteEmployeeById(employeeId),
    onSuccess: () => {
      queryClient.refetchQueries(['employees', companyId])
      onSuccess?.()
    },
    onError: (error) => {
      onError?.(error)
    },
    onSettled: () => {
      onSettled?.()
    },
  })
}
