import { QUIZ_REPOSITORY } from '../../../constants/repositories';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { Inject, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @Inject(QUIZ_REPOSITORY)
    private quizRepository: Repository<Quiz>,
  ) {}

  getAllQuiz(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  getQuizById(id: number): Promise<Quiz> {
    return this.quizRepository.findOne({
      where: {
        id: id,
      },
      relations: ['questions'],
    });
  }

  async deleteQuiz(id: number): Promise<void> {
    await this.quizRepository.delete(id);
  }

  async createQuiz(quiz: CreateQuizDto): Promise<Quiz> {
    try {
      return await this.quizRepository.save(quiz);
    } catch (error) {
      console.log('Hello');
      throw error;
    }
  }
}
