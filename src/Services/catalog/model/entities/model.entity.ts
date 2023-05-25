import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeRemove,
  RelationId,
} from 'typeorm';
import { Brand } from '../../brand/entities/brand.entity';
import { Car } from '../../car/entities/car.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand: Brand;

  @RelationId((model: Model) => model.brand)
  brandId: number;

  @OneToMany(() => Car, (car) => car.model)
  cars: Car[];
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
