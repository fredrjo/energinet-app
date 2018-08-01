import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScorecardPage } from '../scorecard/scorecard.page';
import { SurveyPage } from '../survey/survey.page';
import { OpeningHoursPage } from '../opening-hours/opening-hours.page';
import { ConnectService } from '../../app/services/connect.service';
import { TranslationService } from '../../app/services/translation.service';

@Component({
  selector: 'app-page-scorecardlist',
  templateUrl: './scorecardlist.page.html',
  styleUrls: ['./scorecardlist.page.scss'],
})
export class ScorecardlistPage implements OnInit {

  myOptions: any ;
  menu: any;
  @ViewChild('content') content;
  constructor(private navCtrl: NavController,
  private t: TranslationService,

  private connectService: ConnectService) {
  }
  ngOnInit() {
    this.menu = this.navParams.get('item');
    this.getResource(this.menu.links.self.href);
  }
  ionViewWillEnter() {
    this.content.resize();
  }
  getResource(resource) {
    if (this.myOptions == null) {
      this.connectService.getResource(resource).then(response => {
        this.myOptions = response.content;
        });
      }
   }
   getIcon(designCue) {
    const myIcons = {
      'folder' : 'folder',
      'building' : 'home',
      'report' : 'clipboard',
      'dashboard' : 'myicon-The-Wall',
      'form': 'list-box',
      'time' : 'clock'
    };
    return myIcons[designCue];
  }
  showMe(item) {
    if (item.designCue === 'form') {
      this.navCtrl.goForward(SurveyPage, {item : item, title : this.menu.header.title});
    } else if (item.designCue === 'time') {
      this.navCtrl.goForward(OpeningHoursPage, {item : item, title : this.menu.header.title});
    } else if ((item.designCue === 'folder') || item.designCue === 'building') {
      this.navCtrl.goForward(ScorecardlistPage, {item : item});
    } else {
      this.navCtrl.goForward(ScorecardPage, {item : item});
    }
  }

}
