import type BaseObjectProps from '@/types/baseObject'
import type CategoryProps from '@/types/category'

export default interface ItemProps extends BaseObjectProps {
    // Basic info
    name: string
    code: string
    manufacturer: string
    price: number
    description: string
    
    // Stock info
    quantity: number
    minimum_stock: number
    is_low_stock: boolean
    
    // Technical specs
    processor?: string
    ram?: string
    storage?: string
    screen_size?: string
    camera_resolution?: string
    operating_system?: string
    color?: string
    
    // Common attributes
    voltage?: string
    dimensions?: string
    resolution?: string
    connectivity?: string
    ports?: string
    material?: string
    weight?: string
    
    categories: string[]
    category_ids?: number[]
    status: 'IN_USE' | 'MAINTENANCE' | 'AVAILABLE' | 'BROKEN'
    created_at: string
    updated_at: string
}

export interface StockMovementProps extends BaseObjectProps {
    item: number
    item_name: string
    movement_type: 'ENTRADA' | 'SAIDA'
    quantity: number
    date: string
    notes?: string
    created_at: string
}
