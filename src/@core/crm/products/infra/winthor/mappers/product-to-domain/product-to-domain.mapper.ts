import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import {
  ProductToDomainMapperInput,
  ProductToDomainMapperOutput,
} from '@/@core/crm/products/infra/winthor/mappers/product-to-domain/product-to-domain.dto'

export class ProductToDomainMapper {
  static map(input: ProductToDomainMapperInput): ProductToDomainMapperOutput {
    return ProductEntity.create(
      {
        productCode: input.id,
        price: input.productPrice?.precoTabela,
        description: input.descricao,
        grossWeight: input.pesoBruto,
        packaging: input.embalagem,
        registrationDate: input.dtCadastro,
        unitQuantity: input.quantiadeUnidade,
        bonusValue: input.valorBonificado,
        masterUnit: input.unidadeMaster,
        unit: input.unidade,
        departmentCode: input.department?.id,
        department: input.department?.descricao,
        sectionCode: input.section?.id,
        section: input.section?.descricao,
        supplierCode: input.supplier?.id,
        supplier: input.supplier?.descricao,
      },
      input.id.toString(),
    )
  }
}
