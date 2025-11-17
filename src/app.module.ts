import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from './providers/databases/postgres.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostgresModule],
})
export class AppModule {}
