import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './Services/user/user.module';
import { User } from './Services/user/entities/user.entity';
import { User1684879430735 } from './Common/Database/Migrations/1684879430735-User';
import { AuthModule } from './Services/auth/auth.module';
import { CatalogModule } from './Services/catalog/catalog.module';
import { Model } from './Services/catalog/model/entities/model.entity';
import { Car } from './Services/catalog/car/entities/car.entity';
import { Brand } from './Services/catalog/brand/entities/brand.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Dennis2001!',
      database: 'task',
      entities: [User, Model, Car, Brand],
      migrations: [User1684879430735],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
