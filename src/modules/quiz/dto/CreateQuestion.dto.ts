/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'question must not empty' })
  @Length(3, 255)
  question: string;

  @IsNotEmpty()
  quizId: number;
}
