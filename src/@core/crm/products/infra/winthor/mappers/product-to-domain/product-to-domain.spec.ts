import { ProductEntity } from '@/@core/crm/products/domain/entities/product/product.entity'
import { ProductToDomainMapper } from '@/@core/crm/products/infra/winthor/mappers/product-to-domain/product-to-domain.mapper'
import { ProductModel } from '@/@core/crm/products/infra/winthor/typeorm/models/product.model'

describe('ProductToDomainMapper unit tests', () => {
  const sut = ProductToDomainMapper

  it('Deve retornar o map correto para o domínio', () => {
    const product: ProductModel = {
      id: 12,
      dataUltimaAlteracaoComercial: new Date(),
      dtCadastro: new Date(),
      dtExclusao: new Date(),
      dtUltimaAlteracao: new Date(),
      descricao: 'Sample Product',
      pesoBruto: 0.5,
      quantiadeUnidade: 1,
      unidade: 'Sample Unit',
      unidadeMaster: 'Sample Master Unit',
      valorBonificado: 0.1,
      embalagem: 'Sample Packaging',
      productPrice: {
        id: 1,
        precoTabela: 9.99,
        produto: 12,
        unidade: 'Sample Unit',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      obs2: 'FL',
      department: {
        id: 1,
        descricao: 'Sample Department',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      pesoLiquido: 0.4,
      section: {
        id: 1,
        descricao: 'Sample Section',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      supplier: {
        id: 1,
        descricao: 'Sample Supplier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }

    const mapper = sut.map(product)

    expect(mapper).toBeInstanceOf(ProductEntity)
    expect(mapper).toEqual(
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
  })
})
