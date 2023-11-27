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
import { PetProfileModule } from './pet-profile/pet-profile.module';
import { PetCharacteristicModule } from './pet-characteristic/pet-characteristic.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        APP_JWT_SECRET: Joi.string().required(),
        AUTH0_DOMAIN: Joi.string().required(),
        AUTH0_CLIENT_ID: Joi.string().required(),
        AUTH0_CLIENT_SECRET: Joi.string().required(),
        AUTH0_CALLBACK_URL: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    PassportModule,
    JwtModule.register({
      global: true,
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
    PetProfileModule,
    PetCharacteristicModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
