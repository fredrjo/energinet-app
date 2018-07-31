import { Component, ViewChild, OnInit, Input, getModuleFactory} from '@angular/core';
import { Events, ModalController, NavController, NavParams, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { SettingsService } from '../../app/services/settings.service';
import { TranslationService } from '../../app/services/translation.service';
import { PendingPage } from '../pending/pending.page';
import { ConnectService } from '../../app/services/connect.service';
import { PendingService } from '../services/pending.service';


@Component({
  selector: 'app-page-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  @ViewChild('here') vc;
  torch: boolean;
  scanner: any;
  meterId: String = '';
  value: number;
  myDate: string = this.formatLocalDate();
  myFormat: String;
  amountPendings: number;
  amountFailed: number;
  focusValue: Boolean = false;
  hasScanned: Boolean = false;
  currentMeter: String = 'Julenissen';
  lastReading = '';
  buildingName = '';
  @Input('pending') myPending;

  constructor(
    private navCtrl: NavController,
    private barcodescanner: BarcodeScanner,
    private navParams: NavParams,
    private connect: ConnectService,
    private storage: Storage,
    private modalCtrl: ModalController,
    private toast: ToastController,
    private settings: SettingsService,
    private t: TranslationService,
    private p: PendingService) {
      this.amountPendings = 0;
      this.amountFailed = 0;
  }
  ngOnInit() {
    this.storage.get('torch').then((val) => {this.torch = val; } );
    this.myFormat = this.t.translate('general', 'datetime_format');
    this.myDate = this.formatLocalDate();
    this.getReadingsAmount();
    this.p.getPendning().subscribe((data) => {
      this.amountPendings = data.scanned;
      this.amountFailed = data.failed;
    });
  }
  itChanged(event) {
    console.log('something changed');
    console.log(event);
    console.log(this.myPending);
  }

  scan() {
    this.barcodescanner.scan({torchOn : this.settings.torch}).then((barcodeData) => {
      this.meterId = this.parseUrl(barcodeData.text);
      this.myDate = this.formatLocalDate();
      this.vc.setFocus(); },
      (err) => {
        this.showToast(this.t.translate('qrscanner', 'qr_invalid')); });
  }
  validate() {
    if (this.meterId === '') {
      return false;
    } else {
      this.hasScanned = true;
      return true;
    }
  }
  ok() {
    if (!this.validate()) {
      this.showToast(this.t.translate('qrscanner', 'error'));
      return false;
    } else {
      this.storage.get('pending').then(res => {
        let obj = [];
        if (res) {
          obj = res;
        }
        const newReading = {'meterID' : this.meterId, 'dateTime' : this.myDate,
        'value' : this.value, 'status' : 0, 'error' : 'No Internet connection'};
        obj.push(newReading);
        this.connect.postResource('/api/meterReading', newReading).then((response: Response) => {
          // response.status = parseInt(response.status);
          if (response.status === 0) {
            this.storage.set('pending', obj).then(() => this.getReadingsAmount());
            this.showToast(this.t.translate('qrscanner', 'readings_will_be_sent')
            );
          } else if (res.status === 200 || res.status === 201) {
            this.showToast(this.t.translate('qrscanner', 'success'));
          } else {
            this.showToast(this.t.translate('qrscanner', 'qr_error'));
          }
        });
        this.clear();
      });
    }
  }
  clear() {
    this.meterId = '';
    this.value = null;
    this.myDate = this.formatLocalDate();
    this.hasScanned = false;
  }
  showPending(failed) {
    this.storage.get('pending').then(res => {this.getModal3(failed, res); });
  }
  async getModal3(failed, res) {
    const profileModal = await this.modalCtrl.create({
      component : PendingPage,
      componentProps : { failed : failed,
        pending : res,
        clear : this.t.translate('qrscanner', 'remove'), resend : this.t.translate('qrscanner', 'resend'),
        title : this.t.translate('qrscanner', 'pending_readings'),  value : this.t.translate('qrscanner', 'value'),
        meterID : this.t.translate('qrscanner', 'meterID')
      }
    });
      return await profileModal.present();
   //     profileModal.onDidDismiss(data => {this.getReadingsAmount(); });
  }
  parseUrl (scannedUrl) {
    const meterIdentifier = scannedUrl.substr(scannedUrl.lastIndexOf('=') + 1);
    if ((meterIdentifier.length > 0) && (scannedUrl.indexOf('mid') >= 0)) {
      this.connect.getResource('/api/meterReading/' + meterIdentifier).then(res => {
        if (res.status === 200) {
          this.hasScanned = true;
          this.currentMeter = res.meterName;
          this.lastReading = res.lastValue;
          this.buildingName = res.buildingName;
        } else if (res.status === 0) {
        } else  {
          this.showToast(this.t.translate('qrscanner', 'qr_invalid'));
          this.clear();
          return '';
        }
      })
      return meterIdentifier;
    } else {
      this.showToast(this.t.translate('qrscanner', 'qr_invalid'));
      return '';
    }
  }
  async showToast(mess) {
    const myToast = await this.toast.create({
      message: mess,
      duration: 3000,
      position: 'top'
    });
    myToast.onDidDismiss(() => {});
    myToast.present();
  }
  formatLocalDate() {
    const now = new Date(),
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            const norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear()
        + '-' + pad(now.getMonth() + 1)
        + '-' + pad(now.getDate())
        + 'T' + pad(now.getHours())
        + ':' + pad(now.getMinutes())
        + ':' + pad(now.getSeconds())
        + dif + pad(tzo / 60)
        + ':' + pad(tzo % 60);
  }
  getReadingsAmount() {
    this.storage.get('pending').then(res => {
      this.amountPendings = 0;
      this.amountFailed = 0;
      if (res === null ) {

      } else {
        for (let i = 0; i < res.length; i++) {
          if (res[i].status === 0) {
            this.amountPendings ++;
          } else {
            this.amountFailed ++;
          }
        }
        this.p.setPending(this.amountPendings);
        this.p.setFailed(this.amountFailed);
      }
    });
  }

}
