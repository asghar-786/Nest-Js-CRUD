import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './Entities/entity';
import { Repository } from 'typeorm';
import { userCreate } from './Dto/createUser';
// import { Promise } from 'dns';
// import { UserUpdate } from './Dto/updateUser';
// import { error } from 'console';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(user) private readonly userRepo: Repository<user>,
  ) {}

  Add(userCreate: userCreate) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const users: user = new user();
    users.id = userCreate.id;
    users.name = userCreate.name;
    users.email = userCreate.email;

    return this.userRepo.save(users);
  }
  async UpdateUser(id: number, userCreate: userCreate) {
    console.log(`Updating user with id ${id}`);

    const userExist = await this.userRepo.findOne({ where: { id } });
    console.log('Existing user data:', userExist);

    if (!userExist) {
      console.log(`User does not exist of ${id}`);
      return `User does not exist of ${id}`;
    }

    userExist.id = userCreate.id;
    userExist.name = userCreate.name;
    userExist.email = userCreate.email;

    await this.userRepo.save(userExist);

    console.log(`User updated with id ${id}`);
    return `User updated with ${id}`;
  }

  async delete(id: number) {
    const userToDelete = await this.userRepo.findOne({ where: { id } });

    if (!userToDelete) {
      return `User does not exist for id ${id}`;
    }

    await this.userRepo.remove(userToDelete);

    return `User deleted with id ${id}`;
  }

  findAllUsers(): Promise<user[]> {
    return this.userRepo.find();
  }
  findOneUsers(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }
}
