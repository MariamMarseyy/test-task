import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeRemove,
} from 'typeorm';
import { Model } from '../../model/entities/model.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  logoUrl: string;

  @Column()
  isApproved: boolean;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

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
