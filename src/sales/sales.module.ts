import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Sale]),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
