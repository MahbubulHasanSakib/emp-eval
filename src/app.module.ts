import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigModule } from './api-config/api-config.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConfigService } from './api-config/api-config.service';
import { UploadModule } from './upload/upload.module';
import { DownloadPdfModule } from './download-pdf/download-pdf.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ApiConfigModule,
    MongooseModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: async (apiConfigService: ApiConfigService) => ({
        uri: apiConfigService.getMongodbUri,
      }),
      inject: [ApiConfigService],
    }),
    EmployeeModule,
    UploadModule,
    DownloadPdfModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
