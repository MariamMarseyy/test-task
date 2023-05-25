import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty({ description: 'The name of the model.' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ID of the brand associated with the model.',
  })
  @IsNotEmpty({ message: 'Brand ID is required' })
  brandId: number;
}
