import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  create(status: string, amount: number): Promise<Transaction> {
    const tx = this.transactionRepo.create({ status, amount });
    return this.transactionRepo.save(tx);
  }
}
