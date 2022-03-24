import {
  DeepPartial,
  FindConditions,
  FindOneOptions,
  ObjectID,
  ObjectLiteral,
  SaveOptions,
  UpdateResult,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export interface IRepository<Entity extends ObjectLiteral> {
  create: (entityLike: DeepPartial<Entity>) => Entity
  save: <T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ) => Promise<T & Entity>
  update: (
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ) => Promise<UpdateResult>
  findOne: (
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<Entity>,
  ) => Promise<Entity | undefined>
  clear?: () => void
}
