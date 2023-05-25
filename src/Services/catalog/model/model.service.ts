import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}
  async create(createModelDto: CreateModelDto) {
    const newModel = await this.modelRepository.create(createModelDto);
    await this.modelRepository.save(newModel);

    return newModel;
  }

  async findAll() {
    return await this.modelRepository.find();
  }

  async findOne(id: number) {
    const model = await this.modelRepository.findOne({ where: { id } });
    if (model) {
      return model;
    }

    throw new HttpException('Model not found', HttpStatus.NOT_FOUND);
  }

  async update(updateModelDto: UpdateModelDto) {
    const id = updateModelDto.id;
    await this.modelRepository.update(id, updateModelDto);
    const updated = await this.modelRepository.findOne({ where: { id } });
    if (updated) {
      return updated;
    }

    throw new HttpException('Model not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const deletedModel = await this.modelRepository.delete(id);
    if (!deletedModel.affected) {
      throw new HttpException('Model not found', HttpStatus.NOT_FOUND);
    }
  }
}
