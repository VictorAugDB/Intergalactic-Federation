import { IPilot } from '@/domain/models/Pilot'

export interface IGetPilot {
  getByDocument: (document: string) => Promise<IPilot | undefined>
  getByName: (name: string) => Promise<IPilot | undefined>
}
