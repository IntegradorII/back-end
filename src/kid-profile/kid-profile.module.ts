import { Module } from '@nestjs/common';
import { KidProfileService } from './kid-profile.service';
import { KidProfileController } from './kid-profile.controller';

@Module({
  controllers: [KidProfileController],
  providers: [KidProfileService],
})
export class KidProfileModule {}
