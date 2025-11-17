import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './providers/databases/postgres.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostgresModule, UsersModule],
})
export class AppModule {}
