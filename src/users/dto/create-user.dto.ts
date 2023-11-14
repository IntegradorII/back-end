import { Role } from '@/common/enum/role.enum';

export class CreateUserDto {
  doc_type: string;
  doc_number: string;
  role?: Role;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  points?: number;
  image?: string;
}
