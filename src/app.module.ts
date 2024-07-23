import { Module } from '@nestjs/common';
import { QuizModule } from './modules/quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { QuestionModule } from './modules/question/question.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeEntitiesModule } from './modules/type-entities/type-entities.module';

@Module({
  imports: [
    QuizModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeORMConfig),
    QuestionModule,
    UserModule,
    AuthModule,
    TypeEntitiesModule.makeGlobal(),
  ],
})
export class AppModule {}
