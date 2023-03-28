import { CreateQuestionDto } from '../dto';
import {
  DATA_SOURCE,
  QUESTION_REPOSITORY,
} from '../../../constants/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';

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
}
