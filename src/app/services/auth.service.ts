import { Injectable } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { ConnectService } from '../services/connect.service';
import { Storage } from '@ionic/storage';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userlink: String = 'api/currentUser';
  constructor(
    private connect: ConnectService,
    private storage: Storage,
    private settings: SettingsService
  ) { }

  login () {
    return new Promise((res) => {
      const hasToken = this.storage.get('token');
      res(hasToken)})
    .catch(function(err) {
      return false; }
    );
  }
  base64Login(username, password) {
    return this.connect.login(btoa(username + ':' + password))
    .then(res => {
      if (res['token'] != null) {
        this.settings.setToken(res['token']).then(fix =>
          this.setCurrentUser());
      } else {
        return res;
      }
    })
    .catch(function(err) {
      return 'epic fail';
    });
  }
  setCurrentUser() {
    this.connect.getResource(this.userlink).then(res => {
      const currentUser = this.settings.setUser(res);
    });
  }
  setToken(token) {
    this.settings.setToken(token);
  }
  getToken() {
    return this.settings.getToken();
  }
  logout() {
    this.settings.clearToken();
    this.settings.clearUser();
  }
}
