import { Module } from '@nestjs/common';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { CarController } from './car/car.controller';
import { ModelController } from './model/model.controller';
import { CarService } from './car/car.service';
import { ModelService } from './model/model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand/entities/brand.entity';
import { Model } from './model/entities/model.entity';
import { Car } from './car/entities/car.entity';

@Module({
  controllers: [BrandController, CarController, ModelController],
  providers: [BrandService, CarService, ModelService],
  imports: [TypeOrmModule.forFeature([Brand, Model, Car])],
})
export class CatalogModule {}
