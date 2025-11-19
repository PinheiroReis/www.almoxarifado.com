import { useQuery } from '@tanstack/react-query'
import type ItemProps from '@/types/item'
import api from '@/utils/api'

export default function useItems() {
    return useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const response = await api.get<ItemProps[]>('/items/')
            return response.data
        },
    })
}
