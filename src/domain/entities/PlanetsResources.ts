import { Column, Entity, PrimaryColumn } from 'typeorm'

type IResources = {
  food?: number
  minerals?: number
  water?: number
}

@Entity('planets_resources')
export class PlanetsResources {
  @PrimaryColumn()
  planet!: string

  @Column('jsonb')
  sent!: IResources

  @Column('jsonb')
  received!: IResources
}
