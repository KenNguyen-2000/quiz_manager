import {
  DATA_SOURCE,
  QUESTION_REPOSITORY,
} from '../../../constants/repositories';
import { DataSource } from 'typeorm';
import { Question } from '../entities/question.entity';

export const questionProviders = [
  {
    provide: QUESTION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Question),
    inject: [DATA_SOURCE],
  },
];
