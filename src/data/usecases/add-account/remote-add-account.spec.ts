import { AccountModel } from '@/domain/models';
import { AddAccountParams } from '@/domain/usecases';
import { RemoteAddAccount } from './remote-add-account';
import * as faker from 'faker';
import { HttpPostClientSpy } from '@/data/test';
import { mockAddAccountParams } from '@/domain/teste';
import { HttpStatusCode } from '@/data/Protocols/http';
import { EmailInUseError } from '@/domain/erros';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

console.log(faker.internet.url());

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct BODY', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
});
