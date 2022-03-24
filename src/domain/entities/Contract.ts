import { Pilot } from '@/domain/entities/Pilot'
import { IResource } from '@/domain/models/Contract'
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

@Entity('contracts')
export class Contract {
  @PrimaryColumn()
  id!: string

  @OneToOne(() => Pilot)
  @JoinColumn()
  pilot!: Pilot

  @Column()
  pilotCertificationDocument!: string

  @Column()
  description!: string

  @Column('jsonb')
  payload!: IResource[]

  @Column()
  originPlanet!: string

  @Column()
  destinationPlanet!: string

  @Column()
  acceptanceDate!: Date

  @Column()
  settlementDate!: Date

  @Column()
  value!: number
}
