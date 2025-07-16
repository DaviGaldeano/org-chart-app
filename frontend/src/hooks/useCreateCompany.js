import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCompany } from '@/api/companyApi'

export function useCreateCompany(onSuccess, onError) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['companies'])
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error)
    },
  })
}
