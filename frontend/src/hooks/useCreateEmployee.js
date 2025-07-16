import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEmployee } from '@/api/employeeApi'

export function useCreateEmployee(companyId, onSuccessCallback, onErrorCallback) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (employee) => createEmployee({ companyId, employee }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['employees', companyId])
      onSuccessCallback?.(data)
    },
    onError: (error) => {
      onErrorCallback?.(error)
    },
  })
}
