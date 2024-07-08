import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiConfigModule } from './api-config/api-config.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiConfigService } from './api-config/api-config.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
