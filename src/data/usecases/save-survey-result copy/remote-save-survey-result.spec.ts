import { HttpStatusCode } from '@/data/Protocols/http';
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/erros';
import faker from 'faker';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy<RemoteSaveSurveyResult.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel(),
    };
    await sut.save({ answer: faker.random.word() });
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
  });

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promise = sut.save({ answer: faker.random.word() });
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.save({ answer: faker.random.word() });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.save({ answer: faker.random.word() });
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an LoadSuveyList.Model if httpClientSpy returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyResultModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const surveyResult = await sut.save({ answer: faker.random.word() });
    expect(surveyResult).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date),
    });
  });
});
