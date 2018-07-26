import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  http: any;
  baseUrl: String;
  defaultUrl: String = 'https://www.energinet.net/';
  // defaultUrl: String = 'http://trulsnet.cebyc.int/energinet/energinet/';
  // defaultUrl : String = 'http://fredrik.cebyc.int/energinet/energinet/';
  response: any;
  language: String = 'en_US';
  enetLang: String = 'en';
  user: any;
  torch: boolean;

  constructor(private storage: Storage) {
       this.storage.get('baseUrl').then(res => {
          if (res !== null && res !== undefined) {
              this.baseUrl = res;
          } else {
            this.baseUrl = this.defaultUrl;
          }
       });
      this.storage.get('language').then(res => {
          if (res != null) {
               this.language = res;
          }
      });
      this.storage.get('enetLang').then(res => {
          if (res != null) {
               this.enetLang = res;
          }
      });
      this.storage.get('torch').then(res => {
          this.torch = res;
      });
       this.storage.get('user').then(res => {
          this.user = res;
      });
  }
  getKeys() {
      return this.storage.keys().then(res => res);
  }
  getBaseurl() {
      return this.baseUrl;
  }
  getPendingInQue() {
      return this.storage.get('pending').then(res => {
          if (res !== null) {
          return 'you got stuff';
      } else {
          return 'nothing to send';
      }})
      ;
  }
  getLanguage() {
      return this.language;
  }
  setLanguage(language) {
      const hardcoded = {'nb_NO' : 'no', 'de_DE' : 'de', 'en_US' : 'en', 'se_SE' : 'se', 'dk_DK' : 'dk'};
      this.enetLang = hardcoded[language];
      this.language = language;
      this.storage.set('enetLang', hardcoded[language]);
      this.storage.set('language', language);
  }
  getLocalization() {
      let changed = this.language.replace('_', '-');
      changed = changed.replace('se', 'sv');
      changed = changed.replace('da', 'dk');
      return changed;
  }
  getUser() {
      let myUser = this.user;
      myUser = this.storage.get('user').then(user => user);
      return myUser;
  }
  getToken() {
      return this.storage.get('token').then(res => res);
  }
  setToken(token) {
      return this.storage.set('token', token).then(() => true);
  }
  setBaseurl(url) {
       if (url !== this.baseUrl) {
          this.storage.remove('token');
       }
      this.storage.set('baseUrl', this.baseUrl);
  }
  setTorch(value) {
      this.torch = value;
      this.storage.set('torch', value);
  }
  setUser(user) {
      return this.storage.set('user', user).then(myUser => myUser);
  }
  clearToken() {
      this.storage.remove('token');
  }
  clearUser() {
      this.storage.remove('user');
  }
}
