import faker from 'faker'
import { HttpPostParams } from '../Protocols/http'

export const mockPostrequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
