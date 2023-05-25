import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ description: 'The name of the brand.' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the brand.' })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The URL of the brand logo.' })
  @IsNotEmpty({ message: 'Logo URL is required' })
  @IsString()
  logoUrl: string;
}
