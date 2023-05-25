import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Model } from '../../model/entities/model.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Model, (model) => model.cars)
  model: Model;
}
