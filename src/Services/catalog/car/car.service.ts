import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}
  async create(createCarDto: CreateCarDto, image: Express.Multer.File) {
    const newCar = this.carRepository.create(createCarDto);
    newCar.image = image.filename;

    await this.carRepository.save(newCar);

    return newCar;
  }

  async findAll(brandId: number = null, modelId: number = null) {
    if (brandId != null) {
      if (modelId != null) {
        return await this.carRepository.findBy({ modelId: modelId });
      }
      return await this.carRepository.find({
        relations: { model: true },
        where: { model: { brandId: brandId } },
      });
    }
    return await this.carRepository.find();
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    if (car) {
      return car;
    }

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  async update(updateCarDto: UpdateCarDto) {
    const id = updateCarDto.id;
    await this.carRepository.update(id, updateCarDto);
    const updated = await this.carRepository.findOne({ where: { id } });
    if (updated) {
      return updated;
    }

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deletedCar = await this.carRepository.delete(id);
    if (!deletedCar.affected) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
  }
}
