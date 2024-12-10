import { Module } from '@nestjs/common';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../entity/board-entity';
import { BoardRepository } from '../repository/board.repository';
import { AuthModule } from '../../auth/module/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {
}
