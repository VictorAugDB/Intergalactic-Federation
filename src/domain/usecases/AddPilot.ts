import { IPilot } from '@/domain/models/Pilot'

export interface IAddPilotInput extends IPilot {}

export interface IAddPilot {
  execute: (data: IAddPilotInput) => Promise<IPilot>
}
