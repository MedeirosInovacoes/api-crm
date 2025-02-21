import {
  TProductToCrmMapperInput,
  TProductToCrmMapperOutput,
} from '@/@core/crm/products/application/mappers/product-to-crm/product-to-crm.mapper.dto'

export class ProductToCrmMapper {
  static map(product: TProductToCrmMapperInput): TProductToCrmMapperOutput {
    return {
      product_code: product.productCode.toString(),
      name: product.description,
      price: product?.price?.toString(),
      description: product.description,
      packaging: product.packaging,
      registration_date: product.registrationDate.toISOString(),
      unit_quantity: product.unitQuantity?.toString(),
      gross_weight: product.grossWeight?.toString(),
      bonus_value: product.bonusValue?.toString(),
      master_unit: product.masterUnit,
      unit: product.unit,
      section_code: product.sectionCode?.toString(),
      section: product.section,
      department_code: product.departmentCode?.toString(),
      department: product.department,
      supplier_code: product.supplierCode?.toString(),
      supplier: product.supplier,
    }
  }
}
