import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString({ message: 'Option is required' })
  option: string;
  @IsBoolean()
  isAnswer?: boolean;
  @IsNotEmpty()
  @IsUUID('all', { message: 'Question id should be a valid uuid' })
  questionId: string;
}
