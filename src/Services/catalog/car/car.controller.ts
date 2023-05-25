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
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import multer, { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

@Controller('car')
@ApiBearerAuth()
@ApiTags('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile()
    image: Express.Multer.File,
  ) {
    if (image != null) {
      console.log('It isnt null');
      console.log(image.originalname);
      console.log(image.mimetype);
      console.log(image.path);
    }
    return this.carService.create(createCarDto, image);
  }

  @Get()
  findAll(@Query() brandId: number = null, @Query() modelId: number = null) {
    return this.carService.findAll(brandId, modelId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.carService.findOne(id);
  }

  @Put()
  update(updateCarDto: UpdateCarDto) {
    return this.carService.update(updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carService.remove(id);
  }
}
