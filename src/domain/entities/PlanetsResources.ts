import { Column, Entity, PrimaryColumn } from 'typeorm'

type ISentResources = {
  sent?: {
    food?: number
    minerals?: number
    water?: number
  }
}

type IReceivedResources = {
  received?: {
    food?: number
    minerals?: number
    water?: number
  }
}

@Entity('planets_resources')
export class Ship {
  @PrimaryColumn()
  planet!: string

  @Column('jsonb')
  sent!: ISentResources

  @Column('jsonb')
  resources!: IReceivedResources
}
