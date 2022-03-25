import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('pilots_resources')
export class PilotsResources {
  @PrimaryColumn()
  name!: string

  @Column()
  water!: number

  @Column()
  food!: number

  @Column()
  minerals!: number
}
