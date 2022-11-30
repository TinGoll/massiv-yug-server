import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ItmService {
  baseUrl: string;
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.config.get('ITM_BASE_URL');
  }

  /** Get запросы */
  get<T>(url: string, ...params: any[]): Observable<AxiosResponse<T>> {
    return this.http.get(url, {
      params: {
        ...params,
      },
      baseURL: this.baseUrl,
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
      baseURL: this.baseUrl,
    });
  }
}
