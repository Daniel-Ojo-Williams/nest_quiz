import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  @IsUUID('all', {
    message:
      'Quiz not found, Invalid ID passed, please check and try again later',
  })
  quizzId: string;
}
