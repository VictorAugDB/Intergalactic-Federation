import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('ships')
export class Ship {
  @PrimaryColumn()
  id!: string

  @Column()
  fuelCapacity!: number

  @Column()
  fuelLevel!: number

  @Column()
  weightLevel!: number

  @Column()
  weightCapacity!: number

  @Column()
  location!: string
}
