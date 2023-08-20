import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/user/types';
import { UserService } from 'src/user/user.service';
import { CreateUser } from './types';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUser>): Promise<UserDetails | any> {
    const { email, name, password } = user;
    const isUserExist = await this.userService.findUserByEmail(email);
    if (isUserExist) return 'User with this email is already exists';

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }
}
