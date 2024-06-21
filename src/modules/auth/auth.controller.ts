import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserSinginDto } from './dtos/user-signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserFromRequest } from 'src/common/decorators/user-from-request.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserSinginDto })
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signin(@UserFromRequest() user: User) {
    return this.authService.signin(user);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  profile(@UserFromRequest() user: User) {
    return user;
  }
}
