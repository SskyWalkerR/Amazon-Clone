import { Controller, Get, Request } from '@nestjs/common';
import { UserDetails } from './types';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getUser(@Request() req: any): Promise<UserDetails | null> {
    const userId = req.userData.user.id;
    const user = await this.userService.findUserById(userId);
    return user;
  }
}
