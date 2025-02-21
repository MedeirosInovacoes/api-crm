import { env } from '@/@core/@shared/infra/env'
import { DataSourceOptions } from 'typeorm'

const WINTHOR: DataSourceOptions = {
  type: env.WINTHOR_TYPE as any,
  host: env.WINTHOR_HOST,
  port: env.WINTHOR_PORT,
  username: env.WINTHOR_USERNAME,
  password: env.WINTHOR_PASSWORD,
  serviceName: env.WINTHOR_SERVICE,
  schema: env.WINTHOR_SCHEMA,
  entities: [env.WINTHOR_ENTITIES],
  synchronize: false,
  thickMode: true,
}

export const DATABASE_SOURCE = {
  WINTHOR,
}
