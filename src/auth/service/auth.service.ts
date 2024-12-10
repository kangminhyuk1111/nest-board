import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { AuthCredentialDto } from '../dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({ username: username, password: encryptedPassword });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException('Already existing User Exception');
    }
  }

  async signUp(authCredentialDto: AuthCredentialDto) {
    return await this.createUser(authCredentialDto);
  }

  async login(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ username: username });

    if (!await this.validPassword(user, password)) {
      throw new UnauthorizedException('login failed');
    }

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken: accessToken };
  }

  private async validPassword(user: User, password: string) {
    return user && await bcrypt.compare(password, user.password);
  }
}
