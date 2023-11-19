import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { SegmentsModule } from './segments/segments.module';
import { BenefitsModule } from './benefits/benefits.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { BenefitTypeModule } from './benefit-type/benefit-type.module';
import { AlliedBrandsModule } from './allied-brands/allied-brands.module';
import { SegmentBenefitModule } from './segment-benefit/segment-benefit.module';
import { UserBenefitModule } from './user-benefit/user-benefit.module';
import { KidProfileModule } from './kid-profile/kid-profile.module';

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
    BenefitsModule,
    CharacteristicsModule,
    BenefitTypeModule,
    AlliedBrandsModule,
    SegmentBenefitModule,
    UserBenefitModule,
    KidProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
