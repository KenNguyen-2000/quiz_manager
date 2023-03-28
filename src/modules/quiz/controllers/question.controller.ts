import { CreateQuestionDto } from '../dto';
import {
  Body,
  Controller,
  NotFoundException,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { QuestionService, QuizService } from '../services';
import { Question } from '../entities';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}

  @Get('/:questionId')
  async getQuestionById(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Question> {
    return await this.questionService.findQuestionById(questionId);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async saveQuestion(@Body() question: CreateQuestionDto): Promise<Question> {
    const quiz = await this.quizService.getQuizById(question.quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz Not found');
    }
    return await this.questionService.createQuestion(question, quiz);
  }
}
