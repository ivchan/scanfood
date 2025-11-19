import { Module } from '@nestjs/common';
import { TasklistsController } from './tasklists.controller';
import { TasklistsService } from './tasklists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasklist } from './entities/tasklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasklist])],
  providers: [TasklistsService],
  controllers: [TasklistsController],
  exports: [TasklistsService],
})
export class TasklistsModule {}
