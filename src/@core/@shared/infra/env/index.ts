import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config({ path: './envs/.env' })

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'homologation', 'production', 'test']).default('development'),
  TZ: z.string().optional().default('America/Sao_Paulo'),
  APP_PORT: z.coerce.number().optional().default(3333),
  WINTHOR_ENTITIES: z.string(),
  WINTHOR_TYPE: z.string(),
  WINTHOR_HOST: z.string(),
  WINTHOR_CONNECTION: z.string(),
  WINTHOR_PORT: z.string().transform((value) => +value),
  WINTHOR_SERVICE: z.string(),
  WINTHOR_USERNAME: z.string(),
  WINTHOR_PASSWORD: z.string(),
  WINTHOR_SCHEMA: z.string(),
  HUBSPOT_ACCESS_KEY: z.string(),
  NEWS_CUSTOMERS_PIPELINE_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_LEAD_BASE_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_QUALIFIED_WITHOUT_CREDIT_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_QUALIFIED_WITH_CREDIT_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_DONE_DEAL_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_AWAITING_BILLING_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_AFTER_SALES_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_LOST_BUSINESS_ID: z.string(),
  NEWS_CUSTOMERS_PIPELINE_DISQUALIFIED_ID: z.string(),
  RECURRENTS_PIPELINE_ID: z.string(),
  RECURRENTS_PIPELINE_DONE_DEAL_ID: z.string(),
  RECURRENTS_PIPELINE_QUALIFIED_WITH_CREDIT_ID: z.string(),
  RECURRENTS_PIPELINE_QUALIFIED_WITHOUT_CREDIT_ID: z.string(),
  RECURRENTS_PIPELINE_LEAD_BASE_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_LEAD_BASE_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_REACTIVATION_BASE_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_DONE_DEAL_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_AWAITING_BILLING_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_QUALIFIED_WITH_CREDIT_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_QUALIFIED_WITHOUT_CREDIT_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_AFTER_SALES_ID: z.string(),
  LEAD_RETRIEVAL_PIPELINE_LOST_BUSINESS_ID: z.string(),
  FUSION_LOGIN: z.string(),
  FUSION_PASSWORD: z.string(),
  FUSION_URL: z.string(),
})

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './envs/.env.test' })
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './envs/production/.env' })
} else if (process.env.NODE_ENV === 'homologation') {
  dotenv.config({ path: './envs/.env.homo' })
} else {
  dotenv.config({ path: './envs/.env.dev' })
}

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
