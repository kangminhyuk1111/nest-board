import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDto } from '../dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }
}
