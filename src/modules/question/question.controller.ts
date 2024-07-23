import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createQuestion(@Body() questionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(questionDto);
  }

  @Post('answer')
  async addAnswer(@Body() createAnswer: CreateAnswerDto) {
    this.questionService.addAnswer(createAnswer);
    return { success: true, message: 'Answer added successfully' };
  }
}
