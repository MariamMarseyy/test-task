import { DataSource } from 'typeorm';
import process from 'process';
import { User } from './src/Services/user/entities/user.entity';
import { Model } from './src/Services/catalog/model/entities/model.entity';
import { Car } from './src/Services/catalog/car/entities/car.entity';
import { Brand } from './src/Services/catalog/brand/entities/brand.entity';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'tototo',
  database: 'task',
  logging: false,
  synchronize: false,
  entities: [User, Model, Car, Brand],
  migrations: ['src/Common/Database/Migrations/**/*{.ts,.js}'],
});
