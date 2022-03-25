import { ICreateTransactionReport } from '@/data/contracts/repositories/reports/CreateTransactionReport'
import { Transactions } from '@/domain/entities/Transactions'
import { Repository } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

export class TransactionsReportRepository implements ICreateTransactionReport {
  repository: Repository<Transactions> | undefined

  constructor(private readonly makeRepository: () => Repository<Transactions>) {
    this.repository = undefined
  }

  singletonRepository(): void {
    if (!this.repository) {
      this.repository = this.makeRepository()
    }
  }

  async create(description: string): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const createResult = this.repository.create({
      id: uuidV4(),
      description,
    })

    await this.repository.save(createResult)
  }
}
