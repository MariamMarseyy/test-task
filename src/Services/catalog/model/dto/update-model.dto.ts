import { CreateModelDto } from './create-model.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateModelDto extends CreateModelDto {
  @ApiProperty({ description: 'The id of the model.' })
  @IsNotEmpty({ message: 'id is required' })
  @IsString()
  id: string;
}
