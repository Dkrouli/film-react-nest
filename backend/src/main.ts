import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import { DevLogger } from './logger/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  
  const loggerType = process.env.LOGGER_TYPE || 'dev';

  switch (loggerType) {
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'dev':
      app.useLogger(new DevLogger());
      break;
  }

  await app.listen(3000);
}
bootstrap();
