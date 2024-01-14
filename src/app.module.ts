// AppModule.ts

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { user } from './Entities/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql', 'mariadb', 'sqlite', etc.
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Asghar@123',
      database: 'crudapi',
      entities: [user], // Add your entities here
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([user]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
