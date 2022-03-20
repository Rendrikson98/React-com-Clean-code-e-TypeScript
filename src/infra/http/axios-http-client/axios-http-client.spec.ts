import { HttpPostParams } from '@/data/Protocols/http'
import axios from 'axios'
import faker from 'faker'
import { AxiosHttpClient } from "./axios-http-client"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosresult = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosresult)


const makesut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostrequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct vleus', async () => {
    const request = mockPostrequest()
    const sut = makesut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const sut = makesut()
    const httpResponse = await sut.post(mockPostrequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosresult.status,
      body: mockedAxiosresult.data
    })
  })
})