import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserBenefitDto } from './dto/create-user-benefit.dto';
import { UpdateUserBenefitDto } from './dto/update-user-benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBenefit } from './entities/user-benefit.entity';
import { UsersService } from '@/users/users.service';
import { BenefitsService } from '@/benefits/benefits.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserBenefitService {

  constructor(
    @InjectRepository(UserBenefit)
    private readonly userBenefitRepository: Repository<UserBenefit>,
    private readonly usersService: UsersService,
    private readonly benefitsService: BenefitsService,
  ) { }

  async create(createUserBenefitDto: CreateUserBenefitDto) {

    const { user_email, benefit_id } = createUserBenefitDto;

    const user = await this.usersService.findByEmail(user_email);
    if(!user) {
      throw new NotFoundException('User not found');
    }
    const benefit = await this.benefitsService.findOne(benefit_id);
    if(!benefit) {
      throw new NotFoundException('Benefit not found');
    }

    const userBenefit = await this.userBenefitRepository.findOneBy({
      user_email: {
        email: user_email,
      },
      benefit_id: {
        id: benefit_id,
      },
    });

    if(userBenefit) {
      throw new ConflictException('User Benefit already exists');
    }

    const newUserBenefit = this.userBenefitRepository.create({
      user_email: user,
      benefit_id: benefit,
      amount: createUserBenefitDto.amount,
      remaining: createUserBenefitDto.remaining,
      estatus: createUserBenefitDto.estatus,
      expiration_date: createUserBenefitDto.expiration_date,
    });

    return this.userBenefitRepository.save(newUserBenefit);
  }

  findAll() {
    return this.userBenefitRepository.find();
  }

  findOne(id: number) {
    return this.userBenefitRepository.findOneBy({ id });
  }

  findAllByUserEmail(user_email: string) {
    return this.userBenefitRepository.find({
      where: {
        user_email: {
          email: user_email,
        },
      },
    });
  }

  findAllByBenefitId(benefit_id: number) {
    return this.userBenefitRepository.find({
      where: {
        benefit_id: {
          id: benefit_id,
        },
      },
    });
  }

  async update(id: number, updateUserBenefitDto: UpdateUserBenefitDto) {
    const userBenefit = await this.findOne(id);
    if(!userBenefit) {
      throw new NotFoundException('User Benefit not found');
    }
    const { user_email, benefit_id, amount, remaining, estatus, expiration_date } = updateUserBenefitDto;
    if(user_email && user_email !== userBenefit.user_email.email) {
      const user = await this.usersService.findByEmail(user_email);
      if(!user) {
        throw new NotFoundException('User not found');
      }
      userBenefit.user_email = user;
    }

    if(benefit_id && benefit_id !== userBenefit.benefit_id.id) {
      const benefit = await this.benefitsService.findOne(benefit_id);
      if(!benefit) {
        throw new NotFoundException('Benefit not found');
      }
      userBenefit.benefit_id = benefit;
    }

    return this.userBenefitRepository.update(id, {
      user_email: user_email ? userBenefit.user_email: undefined,
      benefit_id: benefit_id ? userBenefit.benefit_id: undefined,
      amount,
      remaining,
      estatus,
      expiration_date,
    });
  }

  remove(id: number) {
    const userBenefit = this.findOne(id);
    if(!userBenefit) {
      throw new NotFoundException('User Benefit not found');
    }
    return this.userBenefitRepository.delete(id);
  }
}
