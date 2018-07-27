import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ScorecardlistPage } from '../scorecardlist/scorecardlist.page';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'app-page-buildoptions',
  templateUrl: './buildoptions.page.html',
  styleUrls: ['./buildoptions.page.scss'],
})
export class BuildoptionsPage implements OnInit {
  buildings: any;
  scorecards: any;
  constructor(private navCtrl: NavController, private navParams: NavParams, private connectService: ConnectService) {
  }

  ngOnInit() {
    this.buildings = this.navParams.get('item');
    this.getResource(this.buildings.links.self.href);
  }
  getResource(resource) {
    if (this.scorecards == null) {
      this.connectService.getResource(resource).then(response => {
        this.scorecards = response.content;
      });
    }
   }
  showMe(item) {
    this.navCtrl.goForward('/ScorecardlistPage'); // , {item : item});
  }

}
