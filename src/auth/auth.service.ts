import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {
  }

  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);
  }

  async signUp(authCredentialDto: AuthCredentialDto) {
    return await this.createUser(authCredentialDto);
  }
}
