import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto';
import {
  Body,
  Controller,
  NotFoundException,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';
import { Param } from '@nestjs/common/decorators';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}

  @Post(':quizId')
  @UsePipes(ValidationPipe)
  async saveQuestion(
    @Body() question: CreateQuestionDto,
    @Param('quizId', ParseIntPipe) quizId: number,
  ): Promise<Question> {
    console.log('Quiz Id', quizId);
    const quiz = await this.quizService.getQuizById(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz Not found');
    }
    return await this.questionService.createQuestion(question, quiz);
  }
}
