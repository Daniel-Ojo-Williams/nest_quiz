import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<Users | undefined> {
    const user = await this.userService.findUserByEmail(email);

    const credValid = await bcrypt.compare(password, user.password);

    if (!credValid) return undefined;

    return user;
  }
}
