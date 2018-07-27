import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { TranslationService } from '../../app/services/translation.service';
import { WallPage } from '../wall/wall.page';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  walls: any;
  items: any = null;
  @ViewChild('content') content;
  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private t: TranslationService,
    private loadingCtrl: LoadingController,
    private connectService: ConnectService) {
  }
  ngOnInit() {
    this.walls = this.params.get('item');
    this.getResource(this.walls.links.self.href);
  }
  ionViewWillEnter() {
    this.content.resize();
  }
  getResource(resource) {
    if (this.items == null) {
      const loading = this.loadingCtrl.create({
       content: this.t.translate('general', 'loading')
      });
      loading.present();
      this.connectService.getResource(resource).then(response => {
        this.items = response.content;
        loading.dismiss();
      });
    }
  }
  showMe(item) {
    if (item.designCue !== 'notice') {
       this.navCtrl.goForward('/WallPage'); // , {item : item.links.self.href});
    }
  }

}
