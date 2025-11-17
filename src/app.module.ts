import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './providers/databases/postgres.module';
import { UsersModule } from './features/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      ttl: 10,
      max: 100,
    }),
    PostgresModule,
    UsersModule,
  ],
})
export class AppModule {}
