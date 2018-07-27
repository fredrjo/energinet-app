import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslationService } from '../services/translation.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  currentUrl: string;
  isIos: boolean;

  constructor(
    private storage: Storage,
    private platform: Platform,
    private t: TranslationService,
    private settings: SettingsService,
    private toast: ToastController) {
  }
  ngOnInit() {
    this.storage.get('baseUrl').then((val) => {this.currentUrl = val; });
    this.settings.getKeys();
    this.isIos = this.platform.is('ios');
  }
  toggleTorch(value) {
    this.storage.set('torch', value);
  }
  onSubmit() {
    if (this.isIos) {
       this.settings.setTorch(this.settings.torch);
    }
    this.settings.setLanguage(this.settings.language);
    const message = this.toast.create({
      message: this.t.translate('settings', 'saved'),
      duration: 3000,
       position: 'top'
    });
    message.present();
    setTimeout(function() {
      location.reload();
      }, 500);
  }

}
