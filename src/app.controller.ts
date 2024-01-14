/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userCreate } from './Dto/createUser';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { user } from './Entities/entity';
import { UserUpdate } from './Dto/updateUser';

@Controller('user')
@Injectable()
export class AppController {
  constructor(private readonly userservice: AppService) {}

  @Get()
  findone() {
    return this.userservice.findAllUsers();
  }

  @Post()
  create(@Body() userCreate: userCreate) {
    return this.userservice.Add(userCreate);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() userCreate: userCreate) {
    return this.userservice.UpdateUser(id, userCreate);
  }
  @Delete('/:id')
  deletefun(@Param('id') id: number, @Body() userCreate: userCreate) {
    return this.userservice.delete(id);
  }
  @Get('/:id')
  FindbyUserId(@Param('id') id: number) {
    return this.userservice.findOneUsers(id);
  }
}
