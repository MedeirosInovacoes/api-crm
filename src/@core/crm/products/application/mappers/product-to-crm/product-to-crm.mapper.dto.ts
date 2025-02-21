import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'

export type TProductToCrmMapperInput = ProductEntity
export type TProductToCrmMapperOutput = {
  product_code: string
  name: string
  price: string
  description: string
  packaging: string
  registration_date: string
  unit_quantity: string
  gross_weight: string
  bonus_value: string
  master_unit: string
  unit: string
  section_code: string
  section: string
  department_code: string
  department: string
  supplier_code: string
  supplier: string
}
