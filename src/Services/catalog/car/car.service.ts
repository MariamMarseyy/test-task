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
  async create(createCarDto: CreateCarDto) {
    const newCar = await this.carRepository.create(createCarDto);
    await this.carRepository.save(newCar);

    return newCar;
  }

  async findAll() {
    return await this.carRepository.find();
  }

  async findOne(id: string) {
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

  async remove(id: string) {
    const deletedCar = await this.carRepository.delete(id);
    if (!deletedCar.affected) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
  }
}
