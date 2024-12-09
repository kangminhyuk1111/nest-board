import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../board/board-entity';
import { User } from '../auth/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [Board, User],
  synchronize: true,
};

//__dirname + '/../**/*.entity.{js.ts}',
