import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Not, Repository } from 'typeorm';
import { UsersService } from '@/users/users.service';

@Injectable()
export class SalesService {

  constructor(
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
    private readonly usersService: UsersService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { userEmail, ...rest } = createSaleDto;
    const user = await this.usersService.findOneByEmail(userEmail);
    if(!user) {
      throw new NotFoundException('User not found');
    }
    const newSale = this.salesRepository.create({
      ...rest,
      user: {
        id: user.id,
      }
    });
    const sale = await this.salesRepository.save(newSale);
    const points = this.caculatePoints(sale.value);
    try {
      await this.usersService.update(user.id, { points: user.points + points });
      await this.salesRepository.update(sale.id, { updatedPoints: true });
    } catch (error) {
      console.log(error);
    }

    return {
      sale: {
        ...sale,
      },
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
  
  // TODO: Implement this method
  caculatePoints(value: number): number {
    return Math.floor(value / 1000);
  }

  getSalesWithUpdatedPoints() {
    return this.salesRepository.find({
      where: {
        updatedPoints: true,
      },
      relations: ['user'],
    });
  }

  findAllByUserId(userId: string) {
    return this.salesRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });
  }

  getSalesWithoutUpdatedPoints() {
    return this.salesRepository.find({
      where: {
        updatedPoints: Not(true),
      },
      relations: ['user'],
    });
  }
  
  // return this.salesRepository.find({
  //   where: {
  //     updatedPoints: Not(true),
  //   },
  //   relations: ['user'],
  // });

  findAll() {
    return this.salesRepository.find();
  }

  findOne(id: string) {
    return this.salesRepository.findOneBy({ id });
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = this.findOne(id);
    if(!sale) {
      throw new NotFoundException('Sale not found');
    }
    return this.salesRepository.update(id, updateSaleDto);
  }

  remove(id: string) {
    const sale = this.findOne(id);
    if(!sale) {
      throw new NotFoundException('Sale not found');
    }
    return this.salesRepository.delete(id);
  }
}
