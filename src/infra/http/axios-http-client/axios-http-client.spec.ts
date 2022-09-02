import { mockGetrequest, mockPostrequest } from '@/data/test';
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
  describe('post', () => {
    test('Should call axios.post with correct valeus', async () => {
      const request = mockPostrequest();
      const { sut, mockedAxios } = makesut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return  correct response on axios.post', () => {
      const { sut, mockedAxios } = makesut();
      const promise = sut.post(mockPostrequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
    test('Should return correct error on axios.post', () => {
      const { sut, mockedAxios } = makesut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const promise = sut.post(mockPostrequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });
  describe('get', () => {
    test('Should call axios.get with correct valeus', async () => {
      const request = mockGetrequest();
      const { sut, mockedAxios } = makesut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });
  });
});
