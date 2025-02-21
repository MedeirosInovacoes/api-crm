export class FindAllOriginCustomersCompaniesPresenter {
  private static translateMap = {
    customerCode: 'codigoCliente',
    originalSource: 'fonteOriginal',
    originalInDepthSource1: 'fonteOriginalAprofundada1',
    originalInDepthSource2: 'fonteOriginalAprofundada2',
  }

  static translateToPortuguese(input: any) {
    const output: any = {}

    for (const key in input) {
      if (FindAllOriginCustomersCompaniesPresenter.translateMap[key]) {
        output[FindAllOriginCustomersCompaniesPresenter.translateMap[key]] = input[key]
      } else {
        output[key] = input[key]
      }
    }

    return output
  }
}
