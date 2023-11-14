import { Module } from '@nestjs/common';
import { AlliedBrandsService } from './allied-brands.service';
import { AlliedBrandsController } from './allied-brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlliedBrand } from './entities/allied-brand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlliedBrand
    ])
  ],
  controllers: [AlliedBrandsController],
  providers: [AlliedBrandsService],
})
export class AlliedBrandsModule {}
