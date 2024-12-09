import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { CreateBoardDto } from '../dto/create-board-dto';
import { BoardStatus } from '../entity/board-status-enum';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { Board } from '../entity/board-entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {
  }

  // @Get()
  // getAllBoard() {
  //   return this.boardService.getAllBoards();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // @Delete('/:id')
  // deleteBoardById(@Param('id') id: string) {
  //   this.boardService.deleteBoardById(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardService.updateBoardStatus(id, status);
  // }
}
