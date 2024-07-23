import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
  ) {}

  async createUser(newUser: CreateUserDto): Promise<Users> {
    try {
      const user = this.users.create(newUser);
      return await this.users.save(user);
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Something went wrong' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByID(id: string): Promise<Users> {
    const user = await this.users.findOneBy({ id });

    if (!user)
      throw new HttpException(
        { success: false, messeage: 'User not found' },
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.users.findOneBy({ email });

    if (!user)
      throw new HttpException(
        { success: false, messeage: 'User not found' },
        HttpStatus.NOT_FOUND,
      );

    return user;
  }
}
