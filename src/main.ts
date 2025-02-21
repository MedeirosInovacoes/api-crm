import { env } from '@/@core/@shared/infra/env'
import { AppModule } from '@/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  })

  await app.listen(env.APP_PORT)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  console.log(`Application is running on: ${await app.getUrl()} ${env.NODE_ENV}`)
}
bootstrap()
