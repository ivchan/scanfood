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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponse|null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserJson: UserRequest): Promise<UserResponse|null> {
    return this.usersService.update(id, updateUserJson)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
