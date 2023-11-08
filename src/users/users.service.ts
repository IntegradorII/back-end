import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    // const user = this.userRepository.findOneBy({ doc_type: createUserDto.doc_type, doc_number: createUserDto.doc_number });
    // if (user) {
    //   return {
    //     message: 'User already exists'
    //   }
    // }
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
    // return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  findAll() {
    return 'This action returns all users';
  }

  findOneByDocTypeAndDocNumber(doc_type: string, doc_number: string) {
    return this.userRepository.findOneBy({ doc_type, doc_number });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
