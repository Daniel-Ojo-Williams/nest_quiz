import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Questions } from './question.entity';

@Entity('answer')
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  option: string;

  @Column({ type: 'boolean', default: false })
  isAnswer: boolean;

  @ManyToOne(() => Questions, (question) => question.answers)
  question: Questions;
}
