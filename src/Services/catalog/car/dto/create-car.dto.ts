import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'The name of the car.' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The ID of the model associated with the car.' })
  @IsNotEmpty({ message: 'Model ID is required' })
  modelId: number;

  @ApiProperty({ description: 'The image file of the car.' })
  image: any;
}
