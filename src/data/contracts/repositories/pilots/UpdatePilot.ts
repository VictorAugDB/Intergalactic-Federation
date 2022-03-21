import { IPilot } from '@/domain/models/Pilot'

export interface IUpdatePilotInput extends Partial<IPilot> {
  certificationDocument: string
}

export interface IUpdatePilot {
  update: (input: IUpdatePilotInput) => Promise<void>
}
