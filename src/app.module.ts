import { Module } from '@nestjs/common';
import { BoardModule } from './board/module/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule],
})
export class AppModule {}