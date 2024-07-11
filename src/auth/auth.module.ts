import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (apiConfigService: ApiConfigService) => {
        return {
          secret: apiConfigService.getJwtSecret,
          signOptions: { expiresIn: apiConfigService.getJwtExpire },
        };
      },
      inject: [ApiConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
