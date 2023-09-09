import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PublicRoute } from 'src/decorators/publicRoute.decorator';
import { LoginUserDTO, NewUserDTO } from 'src/user/dto/newUser.dto';
import { UserDetails } from 'src/user/types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginUserDTO): Promise<{ access_token: string } | null> {
    return this.authService.login(user);
  }
}
