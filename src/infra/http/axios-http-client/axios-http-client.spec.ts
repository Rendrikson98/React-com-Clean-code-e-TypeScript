import { mockPostrequest } from '@/data/test';
import { mockAxios } from '@/infra/test';
import axios from 'axios';
import { AxiosHttpClient } from "./axios-http-client";

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makesut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct vleus', async () => {
    const request = mockPostrequest()
    const { sut, mockedAxios } = makesut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makesut()
    const promise = sut.post(mockPostrequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})