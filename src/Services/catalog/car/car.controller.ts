import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('car')
@ApiBearerAuth()
@ApiTags('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.carService.create(createCarDto, image);
  }

  @Get()
  findAll(@Query() brandId: number = null, @Query() modelId: number = null) {
    return this.carService.findAll(brandId, modelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Put()
  update(updateCarDto: UpdateCarDto) {
    return this.carService.update(updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
