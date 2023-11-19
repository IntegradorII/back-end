import { Module } from '@nestjs/common';
import { KidProfileService } from './kid-profile.service';
import { KidProfileController } from './kid-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KidProfile } from './entities/kid-profile.entity';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([KidProfile])
  ],
  controllers: [KidProfileController],
  providers: [KidProfileService],
})
export class KidProfileModule {}
