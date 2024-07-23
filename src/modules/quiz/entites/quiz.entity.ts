import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Questions } from '../../question/entities/question.entity';

@Entity('quizes')
export class Quiz extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @OneToMany(() => Questions, (question) => question.Quiz)
  questions: Questions[];
}
