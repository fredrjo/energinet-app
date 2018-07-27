import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../services/settings.service';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  token: string;
  enetlang: String;
  constructor(private http: HttpClient, private settings: SettingsService, private storage: Storage) {
      this.enetlang = settings.enetLang;
  }

  login (authString) {
      return this.http.get(this.settings.getBaseurl() + '/api/accessToken',
          { headers: { 'Authorization' : 'Basic ' + authString, 'Content-Type': 'application/json'} }
          ).toPromise().then((res: Response) => {
              console.log(res);
              return res; })
          .catch(function(err) {
              return false;
          });
  }

  getHeaders(token) {
      const auth = 'Bearer ' + token;
      const headers = { 'Authorization' : auth,
          'Content-Type': 'application/json',
          'Accept-Language' : 'no',
          'Accept-Version' : '2'
      };
      return headers;
  }

  getResource(resource) {
    return this.settings.getToken().then(token => {
          return this.http.get(this.settings.baseUrl + resource + '/',
              { headers: this.getHeaders(token) }
              ).toPromise().then((res: Response) => {
                console.log(res);
                return res;
              }
              ) .catch(function(err) { return err; });
        });
  }
  getFile(filename) {
    return this.http.get(this.settings.baseUrl + filename,
        { headers: this.getHeaders('') }
        ).toPromise().then(res => res)
        .catch (function (err) {
                return err;
            })
        ;
}

putResource(link, payload) {
     return this.storage.get('token').then(token => {
        return this.http.put(this.settings.baseUrl + link, payload,
            { headers: this.getHeaders(token) }
            ).toPromise().then(res => res)
            .catch (function (err) {
                return err;
            });
     });
}

postResource(link, payload) {
     return this.storage.get('token').then(token => {
        return this.http.post(this.settings.baseUrl + link, payload,
            { headers: this.getHeaders(token) }
            ).toPromise().then(res => res)
            .catch (function (err) {
                return err;
            });
        });
 }

 deleteResource(resource) {
      return this.storage.get('token').then(token => {
        return this.http.delete(this.settings.baseUrl + resource + '/',
            { headers: this.getHeaders(token) }
            ).toPromise().then(res => res)
            .catch (function (err) {
                return err;
            });
        });
}
}
