import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty({ message: 'The quiz should have a title' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @Length(3)
  description: string;
}
