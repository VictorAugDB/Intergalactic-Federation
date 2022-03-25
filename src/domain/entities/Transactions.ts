import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('transactions')
export class Transactions {
  @PrimaryColumn()
  id!: string

  @Column()
  description!: string
}
