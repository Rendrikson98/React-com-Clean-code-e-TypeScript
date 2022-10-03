import { HttpStatusCode } from '@/data/Protocols/http';
import { HttpGetClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/erros';
import faker from 'faker';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Model>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel(),
    };
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an LoadSuveyList.Model if httpGetClientSpy returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyResultModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const surveyResult = await sut.load();
    expect(surveyResult).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date),
    });
  });
});
