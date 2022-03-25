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

  @Column({
    type: 'jsonb',
    default: {
      food: 0,
      water: 0,
      minerals: 0,
    },
  })
  sent!: IResources

  @Column({
    type: 'jsonb',
    default: {
      food: 0,
      water: 0,
      minerals: 0,
    },
  })
  received!: IResources
}
