import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeRemove,
  RelationId,
} from 'typeorm';
import { Model } from '../../model/entities/model.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Model, (model) => model.cars)
  model: Model;

  @RelationId((car: Car) => car.model)
  modelId: number;

  @Column({ default: '' })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ default: null, type: 'datetime' })
  updated_at?: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deleted_at?: Date;

  @BeforeRemove()
  setDeletedAt() {
    this.deleted_at = new Date();
  }
}
