import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductDBGateway } from '@/@core/crm/products/domain/gateway/product-db/product-db.gateway'
import { TProductWinthorRepositoryDependencies } from '@/@core/crm/products/infra/winthor/typeorm/repository/product.repository.dto'
import { IsNull, Raw } from 'typeorm'

export class ProductWinthorRepository implements ProductDBGateway {
  constructor(private dependencies: TProductWinthorRepositoryDependencies) {}

  findAll = async (): Promise<ProductEntity[]> => {
    const response = await this.dependencies.productWinthorRepository.find({
      relations: ['department', 'section', 'supplier', 'productPrice'],
      where: {
        dtExclusao: IsNull(),
        obs2: Raw((alias) => `((${alias} NOT IN ('FL')) OR (${alias} IS NULL))`),
      },
    })

    return response.map((product) =>
      ProductEntity.create(
        {
          productCode: product.id,
          price: product.productPrice?.precoTabela,
          description: product.descricao,
          grossWeight: product.pesoBruto,
          packaging: product.embalagem,
          registrationDate: product.dtCadastro,
          unitQuantity: product.quantiadeUnidade,
          bonusValue: product.valorBonificado,
          masterUnit: product.unidadeMaster,
          unit: product.unidade,
          departmentCode: product.department?.id,
          department: product.department?.descricao,
          sectionCode: product.section?.id,
          section: product.section?.descricao,
          supplierCode: product.supplier?.id,
          supplier: product.supplier?.descricao,
        },
        product.id.toString(),
      ),
    )
  }
}
