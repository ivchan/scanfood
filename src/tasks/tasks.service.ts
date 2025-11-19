import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ){}

  async create(createTask: Task): Promise<Task> {
    const task = this.taskRepository.create(createTask);
    const savedTask = await this.taskRepository.save(task);
    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async findAllActive(): Promise<Task[]> {
    const tasks = await this.taskRepository.find({ where: { isActive: true } })
    return tasks;
  }

  async findOne(key: string): Promise<Task|undefined>{
    const task = await this.taskRepository.findOne({ 
      where: { 
        key : key,
        isActive: true,
      } 
    });
    if (!task) {
     throw new NotFoundException(`Task with ID [${key}] not found`); // Sets 404 + message
    }
    return task;
  }

  async update(key: string, updateTask: Task): Promise<Task|undefined> {
    await this.taskRepository.update(key, updateTask);
    const task = this.findOne(key);
    return task;
  }

  async remove(key: string): Promise<void> {
    const task = await this.findOne(key);
    if (!task) {
     throw new NotFoundException(`Task with ID [${key}] not found`); // Sets 404 + message
    }
    await this.taskRepository.delete(key);
  }
}