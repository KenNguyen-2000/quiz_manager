import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { OptionService, QuestionService, QuizService } from './services';
import {
  OptionController,
  QuestionController,
  QuizController,
} from './controllers';
import { optionProviders, questionProviders, quizProviders } from './providers';

@Module({
  imports: [DatabaseModule],
  controllers: [QuizController, QuestionController, OptionController],
  providers: [
    ...quizProviders,
    ...questionProviders,
    ...optionProviders,
    QuizService,
    QuestionService,
    OptionService,
  ],
})
export class QuizModule {}
