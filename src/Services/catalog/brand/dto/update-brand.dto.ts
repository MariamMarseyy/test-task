import { CreateBrandDto } from './create-brand.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBrandDto extends CreateBrandDto {
  @ApiProperty({ description: 'The id of the brand.' })
  @IsNotEmpty({ message: 'id is required' })
  @IsString()
  id: string;
}
