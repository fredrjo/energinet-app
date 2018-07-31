import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { TranslationService } from '../../app/services/translation.service';
import { AlarmsService } from '../../app/services/alarms.service';

@Component({
  selector: 'app-page-buildings',
  templateUrl: './buildings.page.html',
  styleUrls: ['./buildings.page.scss'],
})
export class BuildingsPage implements OnInit, AfterViewInit {
  buildings: any = null;
  title: string;
  @ViewChild('content') content;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private t: TranslationService,
    private alarmSer: AlarmsService,
    private connectService: ConnectService) {
  }
  ngOnInit() {
    this.title = 'Building';
    this.getResource('api/myBuildings'); // this.item.links.self['href']);
  }
  ngAfterViewInit() {
    this.content.resize();
    if (this.buildings !== null) {
      for (let i = 0; i < this.buildings.length; i++) {
        const updatedAlarms = this.alarmSer.getBuildingsAlarms(this.buildings[i].links.self.href);
        this.buildings[i].pendings = updatedAlarms.pending;
        this.buildings[i].cardinality = updatedAlarms.cardinality;
      }
    }
  }
  async getResource(resource) {
    if (this.buildings == null) {
      const loading = await this.loadingCtrl.create({
        content: 'building' // this.t.translate('general', 'loading')
      });
      loading.present();
      this.connectService.getResource(resource).then(response => {
        console.log(response);
        this.buildings = response.content;
        loading.dismiss();
        // this.setAlarms();
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
