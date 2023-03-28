import { QuestionController } from './controllers/question.controller';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { quizProviders } from './providers/quiz.providers';
import { QuestionService } from './services/question.service';
import { questionProviders } from './providers/question.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [QuizController, QuestionController],
  providers: [
    ...quizProviders,
    ...questionProviders,
    QuizService,
    QuestionService,
  ],
})
export class QuizModule {}
