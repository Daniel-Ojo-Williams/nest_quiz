import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Users } from '../user/entity/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocaLStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this.authService.validateUserCredentials(
      email,
      password,
    );

    if (!user)
      throw new HttpException(
        {
          success: false,
          message: 'Invalid credentials',
          status_code: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }
}
