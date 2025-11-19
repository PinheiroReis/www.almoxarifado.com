import type BaseObjectProps from '@/types/baseObject'
import type CategoryProps from '@/types/category'

export default interface ItemProps extends BaseObjectProps {
    categories: CategoryProps[] | null
    description: string
    status: 'IN_USE' | 'MAINTENANCE' | 'AVAILABLE' | 'BROKEN'
    url: string
}
