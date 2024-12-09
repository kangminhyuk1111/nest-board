import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board-dto';
import { BoardRepository } from '../repository/board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board-entity';
import { BoardStatus } from '../board-status-enum';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Can\`t find board id: ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  async findAll(): Promise<Board[]> {
    return await this.boardRepository.find();
  }
}
