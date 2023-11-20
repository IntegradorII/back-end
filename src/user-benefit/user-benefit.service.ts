import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    const { userEmail, benefitId, estatus, expirationDate, ...rest } = createUserBenefitDto;
    let { amount, remaining } = rest;
    if(amount === undefined) {
      amount = 1;
    }
    if(remaining === undefined) {
      remaining = amount;
    }

    if(amount < remaining) {
      throw new BadRequestException('Remaining most be less or equal to amount');
    }

    const user = await this.usersService.findOneByEmail(userEmail);
    if(!user) {
      throw new NotFoundException('User not found');
    }
    const benefit = await this.benefitsService.findOne(benefitId);
    if(!benefit) {
      throw new NotFoundException('Benefit not found');
    }


    const userBenefit = await this.userBenefitRepository.findOneBy({
      user: {
        email: userEmail,
      },
      benefit: {
        id: benefitId,
      },
    });

    if(userBenefit) {
      throw new ConflictException('User Benefit already exists');
    }

    const newUserBenefit = this.userBenefitRepository.create({
      user,
      benefit,
      amount,
      remaining,
      estatus,
      expirationDate
    });

    return this.userBenefitRepository.save(newUserBenefit);
  }

  findAll() {
    return this.userBenefitRepository.find();
  }

  findOne(id: string) {
    return this.userBenefitRepository.findOneBy({ id });
  }

  findAllByUserEmail(userEmail: string) {
    return this.userBenefitRepository.find({
      where: {
        user: {
          email: userEmail,
        },
      },
    });
  }

  findAllByBenefitId(benefitId: string) {
    return this.userBenefitRepository.find({
      where: {
        benefit: {
          id: benefitId,
        },
      },
    });
  }

  async update(id: string, updateUserBenefitDto: UpdateUserBenefitDto) {
    const userBenefit = await this.findOne(id);
    if(!userBenefit) {
      throw new NotFoundException('User Benefit not found');
    }
    const { userEmail, benefitId, amount, remaining, estatus, expirationDate } = updateUserBenefitDto;
    if(userEmail && userEmail !== userBenefit.user.email) {
      const user = await this.usersService.findOneByEmail(userEmail);
      if(!user) {
        throw new NotFoundException('User not found');
      }
      userBenefit.user = user;
    }

    if(benefitId && benefitId !== userBenefit.benefit.id) {
      const benefit = await this.benefitsService.findOne(benefitId);
      if(!benefit) {
        throw new NotFoundException('Benefit not found');
      }
      userBenefit.benefit = benefit;
    }

    return this.userBenefitRepository.update(id, {
      user: userEmail ? userBenefit.user: undefined,
      benefit: benefitId ? userBenefit.benefit: undefined,
      amount,
      remaining,
      estatus,
      expirationDate,
    });
  }

  remove(id: string) {
    const userBenefit = this.findOne(id);
    if(!userBenefit) {
      throw new NotFoundException('User Benefit not found');
    }
    return this.userBenefitRepository.delete(id);
  }
}
