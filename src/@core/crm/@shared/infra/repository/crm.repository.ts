import { CrmGatewayInterface } from '@/@core/crm/@shared/domain/crm.gateway'
import { env } from '@/@core/@shared/infra/env'

import { Client } from '@hubspot/api-client'
import { millisecondsToSeconds, secondsToMilliseconds } from 'date-fns'

export class CrmRepository implements CrmGatewayInterface {
  private requestCount = 0
  private lastRequestTime = Date.now()
  private connection = new Client({ accessToken: env.HUBSPOT_ACCESS_KEY })

  getConnection() {
    return this.connection
  }

  getRequestCount(): number {
    return this.requestCount
  }

  getLastRequestTime(): number {
    return this.lastRequestTime
  }

  async enforceRequestLimit(): Promise<void> {
    this.requestCount++
    const { requestCount, time } = await this.checkRequestLimit({
      requestCount: this.requestCount,
      time: this.lastRequestTime,
    })

    this.requestCount = requestCount
    this.lastRequestTime = time
  }

  private async checkRequestLimit(input: {
    requestCount: number
    time: number
  }): Promise<{ requestCount: number; time: number }> {
    const seconds = millisecondsToSeconds(Date.now() - input.time)

    await new Promise((resolve) => setTimeout(resolve, 100))

    if (input.requestCount >= 145) {
      input.requestCount = 0

      await new Promise((resolve) => setTimeout(resolve, secondsToMilliseconds(11 - seconds)))
      input.time = Date.now()
    }

    return { requestCount: input.requestCount, time: input.time }
  }
}
