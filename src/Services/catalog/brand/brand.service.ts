import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const newBrand = await this.brandRepository.create(createBrandDto);
    await this.brandRepository.save(newBrand);

    return newBrand;
  }

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(id: string) {
    const brand = await this.brandRepository.findOne({ where: { id } });
    if (brand) {
      return brand;
    }

    throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
  }

  async update(updateBrandDto: UpdateBrandDto) {
    const id = updateBrandDto.id;
    await this.brandRepository.update(id, updateBrandDto);
    const updated = await this.brandRepository.findOne({ where: { id } });
    if (updated) {
      return updated;
    }

    throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const deletedBrand = await this.brandRepository.delete(id);
    if (!deletedBrand.affected) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
  }
}
