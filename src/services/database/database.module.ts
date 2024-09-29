import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/entities/users.entity';
import { Task } from '~/entities/tasks.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [__dirname + '/../entities/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Task]),
  ],
})
export class DatabaseModule {}
