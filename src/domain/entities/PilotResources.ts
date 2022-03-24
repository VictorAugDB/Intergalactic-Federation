import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('pilot_resources')
export class Ship {
  @PrimaryColumn()
  planet!: string

  @Column()
  water!: number

  @Column()
  food!: number

  @Column()
  minerals!: number
}
