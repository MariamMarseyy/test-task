import { Module } from '@nestjs/common';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { CarController } from './car/car.controller';
import { ModelController } from './model/model.controller';
import { CarService } from './car/car.service';
import { ModelService } from './model/model.service';

@Module({
  controllers: [BrandController, CarController, ModelController],
  providers: [BrandService, CarService, ModelService],
  imports: [],
})
export class CatalogModule {}
