import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from '../../quiz/entites/quiz.entity';
import { Answer } from './answer.entity';

@Entity('questions')
export class Questions extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;
  @Column({ type: 'text' })
  question: string;
  @Column({
    nullable: true,
    default: '',
  })
  link: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => Quiz, (quiz) => quiz, { nullable: false })
  Quiz: Quiz;
}
