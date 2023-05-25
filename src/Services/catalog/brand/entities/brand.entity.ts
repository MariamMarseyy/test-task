import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Model } from '../../model/entities/model.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  logoUrl: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
