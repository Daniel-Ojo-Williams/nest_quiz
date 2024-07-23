import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entites/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(Quiz) private quizRepo: Repository<Quiz>) {}

  async createQuiz(quizData: CreateQuizDto) {
    return this.quizRepo.save(quizData);
  }

  async getAllQuiz() {
    return this.quizRepo.find();
  }

  async getQuizById(id: string) {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: {
        questions: {
          answers: true,
        },
      },
    });

    return quiz;
  }

  async findQuizByID(id: string) {
    const quiz = await this.quizRepo.findOne({
      where: { id },
      relations: { questions: true },
    });

    if (!quiz)
      throw new HttpException(
        'Quiz not found, please check and try again',
        HttpStatus.NOT_FOUND,
      );

    return quiz;
  }
}
