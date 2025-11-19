import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRequest } from './Request/user-request.json';
import { UserResponse } from './Response/user-response.json';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserJson: UserRequest): Promise<UserResponse>  {
    return this.usersService.create(createUserJson);
  }

  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.usersService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<UserResponse|undefined> {
    return this.usersService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() updateUserJson: UserRequest): Promise<UserResponse|undefined> {
    return this.usersService.update(key, updateUserJson)
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.usersService.remove(key);
  }
}
