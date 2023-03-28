import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [QuizModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
