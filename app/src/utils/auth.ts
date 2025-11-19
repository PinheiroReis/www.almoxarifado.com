import Cookies from 'js-cookie'
import type TokenPair from '@/types/tokenPair'
import api from '@/utils/api'

export function saveTokens({ access, refresh }: TokenPair) {
    Cookies.set('access', access, { expires: 1 })
    Cookies.set('refresh', refresh, { expires: 7 })

    api.defaults.headers.common.Authorization = `Bearer ${access}`
}

export function deleteTokens() {
    Cookies.remove('access')
    Cookies.remove('refresh')

    delete api.defaults.headers.common.Authorization
}
