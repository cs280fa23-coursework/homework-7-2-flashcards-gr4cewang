import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async createUser(userDto: CreateUserDTO): Promise<User> {
    const { password, ...userInfo } = userDto;
    const user = this.userRepository.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });
    if ((await this.findOne(userDto.username)) != null) {
      throw new BadRequestException("Invalid request"); // purposely vague message
    } else {
      user.username = userDto.username;
      user.password = await bcrypt.hash(userDto.password, 10);
      return this.userRepository.save(user);
    }
  }
}
