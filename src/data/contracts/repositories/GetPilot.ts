import { IPilot } from '@/domain/models/Pilot'

export interface IGetPilot {
  getByDocument: (document: string) => Promise<IPilot>
}
