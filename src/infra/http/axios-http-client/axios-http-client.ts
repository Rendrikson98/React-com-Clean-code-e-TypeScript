import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/Protocols/http';
import axios, { AxiosResponse } from 'axios';
export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
