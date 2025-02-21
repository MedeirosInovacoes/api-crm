import { Client } from '@hubspot/api-client'

export interface CrmGatewayInterface {
  getRequestCount(): number
  getLastRequestTime(): number
  getConnection(): Client
  enforceRequestLimit(): Promise<void>
}
