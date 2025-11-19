import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/entities/tag.entity';
import { Tasklist } from './tasklists/entities/tasklist.entity';
import { TasklistsModule } from './tasklists/tasklists.module';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rm35023504@tf',
      database: 'ivan_test_db',
      entities: [User, Tag, Tasklist, Task],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    TagsModule,
    TasklistsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
