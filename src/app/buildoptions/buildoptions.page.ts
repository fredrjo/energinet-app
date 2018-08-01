import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ScorecardlistPage } from '../scorecardlist/scorecardlist.page';
import { ConnectService } from '../services/connect.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-buildoptions',
  templateUrl: './buildoptions.page.html',
  styleUrls: ['./buildoptions.page.scss'],
})
export class BuildoptionsPage implements OnInit {
  buildings: any;
  scorecards: any;
  constructor(private navCtrl: NavController, private navParams: ActivatedRoute, private connectService: ConnectService) {
  }

  ngOnInit() {
    const id = this.navParams.snapshot.params.id;
    if (id === undefined) {
      this.getResource('api/myBuildings');
    } else {
      this.getResource('api/myBuildings/' + id);
    }
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
