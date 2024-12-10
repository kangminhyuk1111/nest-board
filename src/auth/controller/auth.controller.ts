import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDto } from '../dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../get-user.decorator';
import { User } from '../entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/login')
  login(@Body() authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user',user);
  }
}
