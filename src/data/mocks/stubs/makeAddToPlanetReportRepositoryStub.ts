import {
  IAddToPlanetResourcesReport,
  IAddToPlanetResourcesReportInput,
} from '@/data/contracts/repositories/reports/AddToPlanetResourcesReportReport'

export const makeAddToPlanetResourcesReportRepositoryStub =
  (): IAddToPlanetResourcesReport => {
    class AddToPlanetResourcesReportRepositoryUseCaseStub
      implements IAddToPlanetResourcesReport
    {
      async add(data: IAddToPlanetResourcesReportInput): Promise<void> {}
    }

    return new AddToPlanetResourcesReportRepositoryUseCaseStub()
  }
