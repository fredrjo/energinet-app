import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ConnectService } from '../services/connect.service';
import { AlarmsService } from '../services/alarms.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {
  items: any;
  alarms: Number;
  @ViewChild('content') content = null;
  online = true;
  constructor(private connectService: ConnectService, private navCtrl: NavController, alarmService: AlarmsService) {
    this.getResource('/api/app');
    this.items = null;
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.content != null) {
      this.content.resize();
    }
  }
  reload() {
    location.reload();
  }

  getResource(resource) {
    this.connectService.getResource(resource).then(response => {
      if (response.status === 0) {
        this.online = false;
      }
      if (this.items === null && response != null) {
        console.log(response);
        this.items = response.content;
        console.log(this.items);
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].cardinality != null) {
           this.items[i].cardinality = 5;
          }
        }
      } else {
        console.log('something bad happened', response.content);
      }
    });
  }
  getAlarmAmount() {
    return 5;
  }
  showMe(item) {
    return 0;
  }
  getIcon (designCue) {
    const myIcons = {'alarms' : 'myicon-Alarms', 'map' : 'myicon-earth', 'report' : 'myicon-Reports',
    'dashboard' : 'myicon-The-Wall', 'alarms_by_building': 'myicon-Alarms', 'score_card_menu_item' : 'myicon-server' };
    return myIcons[designCue];
  }
  writeToConsole(item) {
    console.log(item);
    this.navCtrl.goForward('/buildings');
  }

}
