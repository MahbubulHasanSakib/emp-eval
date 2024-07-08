import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { ApiConfigModule } from '../api-config/api-config.module';
import { ApiConfigService } from '../api-config/api-config.service';
import { S3Client } from '@aws-sdk/client-s3';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './upload',
    // }),
    /* MulterExtendedModule.registerAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => {
        return {
          accessKeyId: apiConfigService.getAccessKeyId,
          secretAccessKey: apiConfigService.getSecretAccessKey,
          bucket: apiConfigService.getBucket,
          region: apiConfigService.getRegion,
          endpoint: apiConfigService.getEndpoint,
          basePath: apiConfigService.getBasePath,
        };
      },
      inject: [ApiConfigService],
    }),*/
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    {
      provide: 'S3_CLIENT',
      useFactory: (apiConfigService: ApiConfigService) =>
        new S3Client({
          forcePathStyle: false, // Configures to use subdomain/virtual calling format.
          endpoint: apiConfigService.getEndpoint,
          region: apiConfigService.getRegion,
          credentials: {
            accessKeyId: apiConfigService.getAccessKeyId,
            secretAccessKey: apiConfigService.getSecretAccessKey,
          },
        }),
      inject: [ApiConfigService],
    },
  ],
})
export class UploadModule {}
