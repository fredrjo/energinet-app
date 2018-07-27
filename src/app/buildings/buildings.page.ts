import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { TranslationService } from '../../app/services/translation.service';
import { AlarmsService } from '../../app/services/alarms.service';

@Component({
  selector: 'app-page-buildings',
  templateUrl: './buildings.page.html',
  styleUrls: ['./buildings.page.scss'],
})
export class BuildingsPage implements OnInit {
  buildings: any = null;
  item: any;
  @ViewChild('content') content;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private loadingCtrl: LoadingController,
    private t: TranslationService,
    private alarmSer: AlarmsService,
    private connectService: ConnectService) {
  }
  ngOnInit() {
    this.item = this.params.get('item');
    this.getResource(this.item.links.self['href']);
  }
  ionViewWillEnter() {
    this.content.resize();
    if (this.buildings !== null) {
      for (let i = 0; i < this.buildings.length; i++) {
        const updatedAlarms = this.alarmSer.getBuildingsAlarms(this.buildings[i].links.self.href);
        this.buildings[i].pendings = updatedAlarms.pending;
        this.buildings[i].cardinality = updatedAlarms.cardinality;
      }
    }
  }
  getResource(resource) {
    if (this.buildings == null) {
      const loading = this.loadingCtrl.create({
        content: this.t.translate('general', 'loading')
      });
      loading.present();
      this.connectService.getResource(resource).then(response => {
        this.buildings = response.content;
        loading.dismiss();
        this.setAlarms();
      });
    }
  }
  showMe(item) {
    if (item.cardinality > 0 && item.designCue !== 'notice') {
       this.navCtrl.goForward('/alarms'); // AlarmsPage, {item : item});
    }
  }
  setAlarms() {
    for (let i = 0; i < this.buildings.length; i++) {
      this.alarmSer.setSpesificAlarms({
        link : this.buildings[i].links.self.href,
        cardinality : this.buildings[i].cardinality,
      });
    }
  }

}
