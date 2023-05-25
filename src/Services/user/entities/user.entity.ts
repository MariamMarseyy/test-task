import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeRemove,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  password?: string;

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
  @BeforeInsert()
  @BeforeUpdate()
  public static async hashPassword(user: User) {
    if (user.password) {
      const salt = genSaltSync(12);
      user.password = hashSync(user.password, salt);
    }
  }
  verifyPassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
