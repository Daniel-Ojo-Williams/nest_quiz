import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuizService } from '../quiz/quiz.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Questions) private questions: Repository<Questions>,
    private quizServ: QuizService,
    @InjectRepository(Answer) private answers: Repository<Answer>,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const quiz = await this.quizServ.findQuizByID(createQuestionDto.quizzId);
    const question = this.questions.create(createQuestionDto);
    question.Quiz = quiz;
    await question.save();
    delete question.Quiz;
    return question;
  }

  async findAnswer(id: string) {
    const question = await this.questions.findOneBy({ id });

    if (!question)
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);

    return question;
  }

  async addAnswer(createAnswerDto: CreateAnswerDto) {
    const question = await this.findAnswer(createAnswerDto.questionId);
    const answer = this.answers.create(createAnswerDto);

    answer.question = question;

    await answer.save();
  }
}
