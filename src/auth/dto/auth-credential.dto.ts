import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(8)
  username: string;

  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(8)
  password: string;
}
