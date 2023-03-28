import {
  DATA_SOURCE,
  OPTION_REPOSITORY,
} from './../../../constants/repositories';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Option, Question } from '../entities';
import { CreateOptionDto } from '../dto';

@Injectable()
export class OptionService {
  constructor(
    @Inject(OPTION_REPOSITORY)
    private optionRepository: Repository<Option>,
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {}

  async createOption(option: CreateOptionDto, question: Question) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newOption = await this.optionRepository.save({
        text: option.text,
        isCorrect: option.isCorrect,
      });

      question.options.push(newOption);
      await question.save();

      await queryRunner.commitTransaction();

      return newOption;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
