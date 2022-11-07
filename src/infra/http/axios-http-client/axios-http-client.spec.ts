import { mockHttpRequest } from '@/data/test';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import axios from 'axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makesut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axioswith correct valeus', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makesut();
    await sut.request(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      data: request.body,
      headers: request.headers,
    });
  });

  test('Should return  correct response on axios', async () => {
    const { sut, mockedAxios } = makesut();
    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
  test('Should return correct error on axios', () => {
    const { sut, mockedAxios } = makesut();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const promise = sut.request(mockHttpRequest());
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
