import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { TranslationService } from '../../app/services/translation.service';
import { WallPage } from '../wall/wall.page';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  walls: any;
  items: any = null;
  @ViewChild('content') content;
  constructor(
    private navCtrl: NavController,
    private t: TranslationService,
    private loadingCtrl: LoadingController,
    private connectService: ConnectService) {
  }
  ngOnInit() {
    // this.walls = this.params.get('item');
    this.getResource('api/dashboard');
  }
  ngAfterViewInit() {
    // this.content.resize();
  }
  async getResource(resource) {
    if (this.items == null) {
      const loading = await this.loadingCtrl.create({
       content: 'loading' // this.t.translate('general', 'loading')
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
