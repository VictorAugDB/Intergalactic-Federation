import { Ship } from '@/domain/entities/Ship'
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

@Entity('pilots')
export class Pilot {
  @PrimaryColumn()
  certificationDocument!: string

  @OneToOne(() => Ship)
  @JoinColumn()
  ship!: Ship

  @Column()
  shipId!: string

  @Column()
  name!: string

  @Column()
  age!: number

  @Column()
  credits!: number

  @Column()
  locationPlanet!: string
}
