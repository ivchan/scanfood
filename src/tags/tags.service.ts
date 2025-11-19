import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ){}

  async create(createTag: Tag): Promise<Tag> {
    const tag = this.tagRepository.create(createTag);
    const savedTag = await this.tagRepository.save(tag);
    return savedTag;
  }

  async findAll(): Promise<Tag[]> {
    const tags = await this.tagRepository.find();
    return tags;
  }

  async findAllActive(): Promise<Tag[]> {
    const tags = await this.tagRepository.find({ where: { isActive: true } })
    return tags;
  }

  async findOne(key: string): Promise<Tag|undefined>{
    const tag = await this.tagRepository.findOne({ 
      where: { 
        key : key,
        isActive: true,
      } 
    });
    if (!tag) {
     throw new NotFoundException(`Tag with ID [${key}] not found`); // Sets 404 + message
    }
    return tag;
  }

  async update(key: string, updateTag: Tag): Promise<Tag|undefined> {
    await this.tagRepository.update(key, updateTag);
    const tag = this.findOne(key);
    return tag;
  }

  async remove(key: string): Promise<void> {
    const tag = await this.findOne(key);
    if (!tag) {
     throw new NotFoundException(`Tag with ID [${key}] not found`); // Sets 404 + message
    }
    await this.tagRepository.delete(key);
  }
}