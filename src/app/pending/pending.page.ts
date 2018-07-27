import { Component, OnInit} from '@angular/core';
import { NavController, NavParams, ViewController } from '@ionic/angular';
import { TranslationService } from '../../app/services/translation.service';
import { ConnectService } from '../../app/services/connect.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-page-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {
  pending: any = [];
  title: string;
  buttonResend: string;
  buttonClear: string;
  cardHeader: String = 'yo';
  valueString: String = 'bitches';
  failed: boolean;
  myList: any [];
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private store: Storage,
    private connect: ConnectService,
    private view: ViewController,
    private t: TranslationService) {
  }
  ngOnInit() {
    this.cardHeader = this.navParams.get('meterID');
    this.valueString = this.navParams.get('value');
    this.buttonClear = this.navParams.get('clear');
    this.buttonResend = this.navParams.get('resend');
    this.title = this.navParams.get('title');
    this.pending = this.navParams.get('pending');
    this.failed = this.navParams.get('failed');

  }
  setUpList() {
    if (this.failed) {
    }
  }

  dismiss() {
    this.view.dismiss(this.pending);
  }

  clear(leftovers= []) {

    this.store.remove('pending').then(res => {
      this.store.set('pending', leftovers).then(res2 => this.view.dismiss(leftovers));
    });
  }
  send() {
    this.connect.postResource('/api/meterReading', this.pending).then(res => {
      if (res.length >= 0 || res.status === 200 || res.status === 201) {
        if (this.failed === false) {
          this.clear(res);
        } else {
          this.clear([]);
        }
      }
    });
  }

}
