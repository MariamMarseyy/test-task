import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeRemove,
} from 'typeorm';
import { Model } from '../../model/entities/model.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Model, (model) => model.cars)
  model: Model;
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
