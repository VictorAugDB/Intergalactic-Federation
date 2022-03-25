import {
  IAddToPlanetResourcesReceiveReportInput,
  IAddToPlanetResourcesReport,
  IAddToPlanetResourcesSentReportInput,
} from '@/data/contracts/repositories/reports/AddToPlanetResourcesReportReport'

export const makeAddToPlanetResourcesReportRepositoryStub =
  (): IAddToPlanetResourcesReport => {
    class AddToPlanetResourcesReportRepositoryUseCaseStub
      implements IAddToPlanetResourcesReport
    {
      async addSent(
        data: IAddToPlanetResourcesSentReportInput,
      ): Promise<void> {}

      async addReceive(
        input: IAddToPlanetResourcesReceiveReportInput,
      ): Promise<void> {}
    }

    return new AddToPlanetResourcesReportRepositoryUseCaseStub()
  }
