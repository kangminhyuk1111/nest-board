import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../enum/board-status-enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status option`);
    }

    return value;
  }

  private isStatusValid(value: any) {
    const index = this.StatusOptions.indexOf(value);
    return index !== -1;
  }
}
