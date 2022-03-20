import { RequiredFieldValidation } from '@/application/helpers/validators/RequiredField/RequiredFieldValidation'
import { IValidation } from '@/application/protocols/Validation'

export class ValidationBuilder {
  private constructor(
    private readonly fields: string[],
    private readonly validations: IValidation[],
  ) {}

  static fields(fields: string[]): ValidationBuilder {
    return new ValidationBuilder(fields, [])
  }

  required(): ValidationBuilder {
    this.fields.forEach((field) =>
      this.validations.push(new RequiredFieldValidation(field)),
    )

    return this
  }

  build(): IValidation[] {
    return this.validations
  }
}
