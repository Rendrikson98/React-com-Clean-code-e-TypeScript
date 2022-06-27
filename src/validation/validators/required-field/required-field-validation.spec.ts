import { RequiredFieldError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";
import faker from 'faker';

const makesut = (): RequiredFieldValidation => new RequiredFieldValidation(faker.database.column())

describe('RequireFieldValidation', ()=>{
    test('Should return error if field is empty', ()=> {
        const sut = makesut();
        const error = sut.validate('');
        expect(error).toEqual(new RequiredFieldError());
    })
    test('Should return error if field is not empty', ()=> {
        const sut = makesut();
        const error = sut.validate(faker.random.word());
        expect(error).toBeFalsy()
    })
})