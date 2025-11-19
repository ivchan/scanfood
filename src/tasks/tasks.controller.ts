import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTask: Task): Promise<Task>  {
    return this.tasksService.create(createTask);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<Task|undefined> {
    return this.tasksService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() updateTask: Task): Promise<Task|undefined> {
    return this.tasksService.update(key, updateTask)
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.tasksService.remove(key);
  }
}
