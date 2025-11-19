import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserRequest } from "./Request/user-request.json";
import { UserResponse } from "./Response/user-response.json";
import { plainToClass } from "class-transformer";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async create(createUserJson: UserRequest): Promise<User> {
    const user = this.userRepository.create(createUserJson);
    const savedUser = await this.userRepository.save(user);
    return plainToClass(UserResponse, savedUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map(
      user => plainToClass(UserResponse, user)
    );
  }

  async findAllActive(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { isActive: true } })
    return users.map(
      user => plainToClass(UserResponse, user)
    );
  }

  async findOne(key: string): Promise<User|undefined>{
    const user = await this.userRepository.findOne({ 
      where: { 
        key : key,
        isActive: true,
      } 
    });
    if (!user) {
     throw new NotFoundException(`User with ID [${key}] not found`); // Sets 404 + message
    }
    return plainToClass(UserResponse, user);
  }

  async update(key: string, updateUserJson: UserRequest): Promise<User|undefined> {
    await this.userRepository.update(key, updateUserJson);
    const user = this.findOne(key);
    return plainToClass(UserResponse, user);
  }

  async remove(key: string): Promise<void> {
    const user = await this.findOne(key);
    if (!user) {
     throw new NotFoundException(`User with ID [${key}] not found`); // Sets 404 + message
    }
    await this.userRepository.delete(key);
  }
}