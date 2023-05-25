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
import { CreateBrandTable1684952161241 } from './Common/Database/Migrations/1684952161241-CreateBrandTable';
import * as process from 'process';
import { JwtAuthGuard } from './Common/Guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CreateModelTable1684952878331 } from './Common/Database/Migrations/1684952878331-CreateModelTable';
import { CreateCarTable1684952888659 } from './Common/Database/Migrations/1684952888659-CreateCarTable';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: 'root',
      password: 'Dennis2001!',
      database: 'task',
      entities: [User, Model, Car, Brand],
      migrations: [
        User1684879430735,
        CreateBrandTable1684952161241,
        CreateModelTable1684952878331,
        CreateCarTable1684952888659,
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CatalogModule,
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
