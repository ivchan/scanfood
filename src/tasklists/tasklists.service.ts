import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tasklist } from "./entities/tasklist.entity";

@Injectable()
export class TasklistsService {
  constructor(
    @InjectRepository(Tasklist)
    private tasklistRepository: Repository<Tasklist>,
  ){}

  async create(createTasklist: Tasklist): Promise<Tasklist> {
    const tasklist = this.tasklistRepository.create(createTasklist);
    const savedTasklist = await this.tasklistRepository.save(tasklist);
    return savedTasklist;
  }

  async findAll(): Promise<Tasklist[]> {
    const tasklists = await this.tasklistRepository.find();
    return tasklists;
  }

  async findAllActive(): Promise<Tasklist[]> {
    const tasklists = await this.tasklistRepository.find({ where: { isActive: true } })
    return tasklists;
  }

  async findOne(key: string): Promise<Tasklist|undefined>{
    const tasklist = await this.tasklistRepository.findOne({ 
      where: { 
        key : key,
        isActive: true,
      } 
    });
    if (!tasklist) {
     throw new NotFoundException(`Tasklist with ID [${key}] not found`); // Sets 404 + message
    }
    return tasklist;
  }

  async update(key: string, updateTasklist: Tasklist): Promise<Tasklist|undefined> {
    await this.tasklistRepository.update(key, updateTasklist);
    const tasklist = this.findOne(key);
    return tasklist;
  }

  async remove(key: string): Promise<void> {
    const tasklist = await this.findOne(key);
    if (!tasklist) {
     throw new NotFoundException(`Tasklist with ID [${key}] not found`); // Sets 404 + message
    }
    await this.tasklistRepository.delete(key);
  }
}