import { useMutation } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router'
import type Credentials from '@/types/credentials'
import type TokenPair from '@/types/tokenPair'
import api from '@/utils/api'
import { saveTokens } from '@/utils/auth'

export default function useLogin() {
    const navigate = useNavigate()

    return useMutation<AxiosResponse<TokenPair>, unknown, Credentials>({
        mutationFn: (data: Credentials) =>
            api.post<TokenPair>('/accounts/login/', data),
        onSuccess: (response) => {
            saveTokens(response.data)

            navigate('/')

            console.log('Login realizado, cookies de autentificação salvos')
        },
        onError: (error) => {
            console.error('Falha no login:', error)
        },
    })
}
