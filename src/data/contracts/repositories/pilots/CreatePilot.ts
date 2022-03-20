import { IPilot } from '@/domain/models/Pilot'

export interface ICreatePilot {
  create: (data: IPilot) => Promise<IPilot>
}
