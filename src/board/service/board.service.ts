import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from '../entity/board-status-enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from '../dto/create-board-dto';
import { BoardRepository } from '../repository/board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entity/board-entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {
  }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title, description } = createBoardDto;
  //
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Can\`t find board id: ${id}`);
    }

    return found;
  }

  //
  // deleteBoardById(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => found.id !== board.id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
