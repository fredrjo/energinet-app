import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  baseUrl: string;
  token: string;
  constructor(private http: HttpClient) {
      this.baseUrl = 'https://www.energinet.net';
      this.token = 'yt2pt76xb5nbjgd5gvgsjhbqpds5hspg';
  }

  login (authString) {
      return this.http.get(this.baseUrl + '/api/accessToken',
          { headers: { 'Authorization' : 'Basic ' + authString, 'Content-Type': 'application/json'} }
          ).toPromise().then((res: Response) => res.json())
          .catch(function(err) {
              return err.status;
          });
  }

  getHeaders(token) {
      const auth = 'Bearer ' + this.token;
      const headers = { 'Authorization' : auth,
          'Content-Type': 'application/json',
          'Accept-Language' : 'no',
          'Accept-Version' : '2'
      };
      return headers;
  }

  getResource(resource) {
          return this.http.get(this.baseUrl + resource + '/',
              { headers: this.getHeaders(this.token) }
              ).toPromise().then((res: Response) => {
                console.log(res);
                return res;
              }
              ) .catch(function(err) { return err;
          });
  }
}
