import { CreateCarDto } from './create-car.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCarDto extends CreateCarDto {
  @ApiProperty({ description: 'The id of the brand.' })
  @IsNotEmpty({ message: 'id is required' })
  @IsString()
  id: string;
}
