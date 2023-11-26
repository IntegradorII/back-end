import { Module } from '@nestjs/common';
import { PetCharacteristicService } from './pet-characteristic.service';
import { PetCharacteristicController } from './pet-characteristic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetCharacteristic } from './entities/pet-characteristic.entity';
import { PetProfileModule } from '@/pet-profile/pet-profile.module';
import { CharacteristicsModule } from '@/characteristics/characteristics.module';

@Module({
  imports: [
    PetProfileModule,
    CharacteristicsModule,
    TypeOrmModule.forFeature([PetCharacteristic]),
  ],
  controllers: [PetCharacteristicController],
  providers: [PetCharacteristicService],
})
export class PetCharacteristicModule {}
