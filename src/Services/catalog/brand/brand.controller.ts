import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../Common/Guards/jwt-auth.guard';
import { RolesGuard } from '../../../Common/Guards/role.guard';
import { Roles } from '../../../Common/Decorators/roles.decorator';
import { ROLES } from '../../../Common/Enums/user-types';

@Controller('brand')
@ApiTags('brand')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(ROLES.ADMIN)
  async create(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.brandService.findOne(id);
  }

  @Put()
  update(@Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
