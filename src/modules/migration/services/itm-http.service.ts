import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';

export interface Response<T> {
  data: T;
}

const BASE_URL = 'http://192.168.2.10:3134/api';

@Injectable()
export class ItmHttpService {
  constructor(private readonly http: HttpService) {}

  /** Get запросы */
  get<T>(url: string, ...params: any[]): Observable<AxiosResponse<T>> {
    return this.http.get(url, {
      params: {
        ...params,
      },
      baseURL: BASE_URL,
    });
  }

  /** POST запросы */
  post<T = any, J = any>(
    url: string,
    body: J,
    ...params: any[]
  ): Observable<AxiosResponse<T>> {
    return this.http.post(url, {
      params: {
        ...params,
      },
      body,
      baseURL: BASE_URL,
    });
  }
}
