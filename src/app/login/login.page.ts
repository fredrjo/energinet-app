import { Component, OnInit } from '@angular/core';
import { NavController,  ToastController  } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { SettingsService } from '../services/settings.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: String;
  password: string;
  address: String = 'https://www.energinet.net/site/forgotpass';

  constructor(
    private navCtrl: NavController,
    // private iab: InAppBrowser,
    private auth: AuthService,
    // private t: TranslationService,
    private settings: SettingsService,
    private toast: ToastController) {
  }
  ngOnInit() {

  }

  login() {
    this.auth.base64Login(this.email, this.password).then((response: any) => {
      console.log(response);
      this.navCtrl.goForward('/');
    })
    .catch(function(err){
      console.log(err);
    });
  }
  forgotPassword() {
   // this.iab.create(this.address, '_system');
  }
  goSettings() {
    this.navCtrl.goForward('/tabs');
  }
  async showToast(mess) {
    const myToast = await this.toast.create({
          message: mess,
          duration: 3000,
          position: 'top'
          });
    myToast.present();
  }

}
