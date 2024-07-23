import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entity/user.entity';
import { Quiz } from '../quiz/entites/quiz.entity';
import { Questions } from '../question/entities/question.entity';

@Module({})
export class TypeEntitiesModule {
  static makeGlobal(): DynamicModule {
    return {
      global: true,
      module: TypeEntitiesModule,
      imports: [TypeOrmModule.forFeature([Users, Quiz, Questions])],
      exports: [TypeOrmModule],
    };
  }
}
