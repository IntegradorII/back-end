import { Module } from '@nestjs/common';
import { PetProfileService } from './pet-profile.service';
import { PetProfileController } from './pet-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetProfile } from './entities/pet-profile.entity';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([PetProfile]),
  ],
  controllers: [PetProfileController],
  providers: [PetProfileService],
  exports: [PetProfileService],
})
export class PetProfileModule {}
