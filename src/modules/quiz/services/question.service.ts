import {
  DATA_SOURCE,
  QUESTION_REPOSITORY,
} from '../../../constants/repositories';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Question, Quiz } from '../entities';
import { CreateQuestionDto } from '../dto';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(QUESTION_REPOSITORY)
    private questionRepository: Repository<Question>,
    @Inject(DATA_SOURCE)
    private dataSource: DataSource,
  ) {}

  async createQuestion(
    question: CreateQuestionDto,
    quiz: Quiz,
  ): Promise<Question> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newQuestion = await this.questionRepository.save({
        question: question.question,
      });

      quiz.questions.push(newQuestion);
      await quiz.save();

      await queryRunner.commitTransaction();

      return newQuestion;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findQuestionById(questionId: number): Promise<Question> {
    try {
      const question = await this.questionRepository.findOne({
        where: {
          id: questionId,
        },
        relations: ['quiz', 'options'],
      });

      if (!question) {
        throw new NotFoundException('Question not found!');
      }

      return question;
    } catch (error) {
      throw error;
    }
  }
}
