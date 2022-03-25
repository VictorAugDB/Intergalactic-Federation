import { IPublishContractDTO } from '@/application/dtos/PublishContract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'

export function makePublishContractDocReqSchema(): IPublishContractDTO {
  const { description, destinationPlanet, originPlanet, payload, value } =
    mockFakeContract()
  return {
    description,
    destinationPlanet,
    originPlanet,
    payload,
    value,
  }
}
