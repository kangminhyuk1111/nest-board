import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Board } from '../../board/entity/board-entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Board, board => board.user, { eager: true })
  boards: Board[];

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
