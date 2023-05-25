import {
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class AuthRequestDto {
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty({
    description: 'Insert account email.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Insert account password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class SignUpDto {
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty({ description: 'The name of the user.' })
  name: string;

  @ApiProperty({
    description: 'Insert email. Ex: peterwillson@gmail.com.',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Insert password',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty({ message: 'role is required' })
  @ApiProperty({ description: 'The role of the user.' })
  role: string;
}
