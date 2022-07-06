import { FieldValidation } from "@/validation/protocols/FieldValidation"

export class FieldvalidationSpy implements FieldValidation{
  error: Error = null
  constructor (readonly field:string){}
  validate(value: string): Error {
    return this.error
  }
}