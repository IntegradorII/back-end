import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { SegmentsModule } from './segments/segments.module';
import { BrandsModule } from './brands/brands.module';
import { BenefitsModule } from './benefits/benefits.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jsonpostgres',
      database: 'localintegrador',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    AuthModule,
    UsersModule,
    SalesModule,
    SegmentsModule,
    BrandsModule,
    BenefitsModule,
    CharacteristicsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
