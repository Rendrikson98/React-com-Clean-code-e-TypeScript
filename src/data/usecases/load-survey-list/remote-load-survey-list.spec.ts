import { HttpStatusCode } from '@/data/Protocols/http';
import { HttpClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { AccessDeniedError, UnexpectedError } from '@/domain/erros';
import faker from 'faker';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an LoadSuveyList.Model if httpClientSpy returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        didAnswer: httpResult[0].didAnswer,
        date: new Date(httpResult[0].date),
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        didAnswer: httpResult[1].didAnswer,
        date: new Date(httpResult[1].date),
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        didAnswer: httpResult[2].didAnswer,
        date: new Date(httpResult[2].date),
      },
    ]);
  });

  test('Should return an empty list if httpClientSpy returns 204', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
