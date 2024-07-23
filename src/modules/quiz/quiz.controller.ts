import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuiz() {
    const quizes = await this.quizService.getAllQuiz();
    return quizes;
  }

  @Get(':id')
  async getQuiz(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizService.getQuizById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() quizData: CreateQuizDto) {
    return await this.quizService.createQuiz(quizData);
  }
}
