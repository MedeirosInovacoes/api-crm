import { env } from '@/@core/@shared/infra/env'
import * as soap from 'soap'

export class FusionClient {
  private _login: string
  private _password: string
  private _wsdlUrl: string
  private _soapClient: soap.Client

  constructor() {
    this._login = env.FUSION_LOGIN
    this._password = env.FUSION_PASSWORD
    this._wsdlUrl = env.FUSION_URL

    this.initializeClient()
  }

  private async initializeClient() {
    try {
      this._soapClient = await soap.createClientAsync(this._wsdlUrl)
    } catch (error) {}
  }

  get client() {
    return this._soapClient
  }

  get login() {
    return this._login
  }

  get password() {
    return this._password
  }
}
