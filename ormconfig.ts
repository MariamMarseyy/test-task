import { DataSource } from 'typeorm';
import process from 'process';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Dennis2001!',
  database: 'task',
  logging: false,
  synchronize: false,
  entities: [],
  migrations: ['src/Common/Database/Migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
