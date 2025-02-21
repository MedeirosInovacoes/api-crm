import { DATABASE_SOURCE } from '@/nest-modules/database-module/database.config'
import { DataSource } from 'typeorm'

const DATABASE_SOURCE_WINTHOR = new DataSource(DATABASE_SOURCE.WINTHOR)

export default DATABASE_SOURCE_WINTHOR
