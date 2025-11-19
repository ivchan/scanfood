import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService
  ){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTag: Tag): Promise<Tag>  {
    return this.tagsService.create(createTag);
  }

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagsService.findAllActive();
  }

  @Get(':key')
  findOne(@Param('key') key: string): Promise<Tag|undefined> {
    return this.tagsService.findOne(key);
  }

  @Put(':key')
  update(@Param('key') key: string, @Body() updateTag: Tag): Promise<Tag|undefined> {
    return this.tagsService.update(key, updateTag)
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('key') key: string) {
    return this.tagsService.remove(key);
  }
}
