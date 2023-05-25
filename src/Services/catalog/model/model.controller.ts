import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('model')
@ApiBearerAuth()
@ApiTags('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOne(id);
  }

  @Put()
  update(@Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(id);
  }
}
