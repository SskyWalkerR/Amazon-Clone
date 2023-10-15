import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/user/types';
import { UserService } from 'src/user/user.service';
import { CreateUser, LoginUser } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

  async register(user: Readonly<CreateUser>): Promise<UserDetails | any> {
    const { email, name, password } = user;
    const isUserExist = await this.userService.findUserByEmail(email);
    if (isUserExist)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUser);
  }

  async login(
    userData: Readonly<LoginUser>,
  ): Promise<{ access_token: string }> {
    const { email, password } = userData;
    const user = await this.validateUser(email, password);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    return { access_token: jwt };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
