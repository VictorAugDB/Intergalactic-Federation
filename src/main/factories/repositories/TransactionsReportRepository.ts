import { Transactions } from '@/domain/entities/Transactions'
import { TransactionsReportRepository } from '@/infra/repositories/TransactionsReportRepository'
import { getRepository, Repository } from 'typeorm'

export const makeTransactionsReportRepositoryFactory =
  (): TransactionsReportRepository => {
    return new TransactionsReportRepository(getTransactionsRepository)
  }

const getTransactionsRepository = (): Repository<Transactions> =>
  getRepository(Transactions)
