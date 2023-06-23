import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export default class Swagger {
  config: Omit<OpenAPIObject, 'paths'>;
  running: boolean;

  port = process.env.PORT || 8000;

  host = process.env.HOST || 'http://localhost';

  constructor(private app: INestApplication) {
    this.setDocument();
  }

  setDocumentBuilder() {
    const securityScheme: SecuritySchemeObject = {
      type: 'apiKey',
      name: 'api-key',
      in: 'header',
    };

    const etagSecurityScheme: SecuritySchemeObject = {
      type: 'apiKey',
      name: 'if-match',
      in: 'header',
    };

    this.config = new DocumentBuilder()
      .setTitle('Movies API')
      .setDescription('The movies API description')
      .setVersion('1.0')
      .addTag('movies-api')
      .addServer('/api')
      .addApiKey(securityScheme, 'api-key')
      .addApiKey(etagSecurityScheme, 'etag')
      .build();
  }

  setDocument() {
    this.setDocumentBuilder();
    const document = SwaggerModule.createDocument(this.app, this.config);
    SwaggerModule.setup('/api/docs', this.app, document);
    this.running = true;
  }

  status() {
    if (!this.running)
      Logger.log(`❌Swagger is not running, something went wrong`);
    else
      Logger.log(
        `✅ Swagger is running on: ${this.host}:${this.port}/api/docs`,
      );
  }
}
