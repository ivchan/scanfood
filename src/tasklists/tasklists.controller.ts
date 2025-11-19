import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TasklistsService } from './tasklists.service';
import { Tasklist } from './entities/tasklist.entity';

@Controller('tasklists')
export class TasklistsController {
  constructor(
    private readonly tasklistsService: TasklistsService
  ){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTasklist: Tasklist): Promise<Tasklist>  {
    return this.tasklistsService.create(createTasklist);
  }

  @Get()
  findAll(): Promise<Tasklist[]> {
    return this.tasklistsService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<Tasklist|undefined> {
    return this.tasklistsService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() updateTasklist: Tasklist): Promise<Tasklist|undefined> {
    return this.tasklistsService.update(key, updateTasklist)
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.tasklistsService.remove(key);
  }
}
