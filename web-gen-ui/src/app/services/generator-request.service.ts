import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { GeneratorType } from '../models/generator-type';

export const GENERATOR_TYPES: GeneratorType[] = [
  new GeneratorType('test-page-1', 'Test Page 1')
];

@Injectable()
export class GeneratorRequestService {

  constructor(private http: Http) { }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private createWebRequest(url: string, params: Object) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const request = this.http.post(url,
      params,
      options)
      .map(this.extractData)
      .catch(this.handleError);
    return request.toPromise()
      .then(x => {
        console.log(x);
        return x;
      })
      .catch(x => { });
  }

  generate(url: string, params: Object) {
    return this.createWebRequest(url, params);
  }



}
