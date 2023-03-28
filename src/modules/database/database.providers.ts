import { Question } from '../quiz/entities/question.entity';
import { Quiz } from 'src/modules/quiz/entities/quiz.entity';
import { DATA_SOURCE } from './../../constants/repositories';
import { DataSource } from 'typeorm';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Joker-345',
        database: 'quiz',
        entities: [Quiz, Question],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
