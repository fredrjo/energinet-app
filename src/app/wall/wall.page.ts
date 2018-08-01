import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { ParserService } from '../../app/services/parser.service';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ChartPage } from '../chart/chart.page';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-wall',
  templateUrl: './wall.page.html',
  styleUrls: ['./wall.page.scss'],
})
export class WallPage implements OnInit {
  link: any;
  wall: any;
  content: any;
  reportlink: String = '/api/reportResults/';
  stuff: any;
  constructor(
    private navCtrl: NavController,
    // private iab: InAppBrowser,
    private connectService: ConnectService,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private parserService: ParserService,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    // this.link = this.params.get('item');
    const id = this.activatedRoute.snapshot.params.id;
    this.getResource('api/dashboard/' + id);
  }
   getResource(resource) {
    this.connectService.getResource(resource).then(response => {
      if (response.content[0] != null) {
        this.wall = response.content[0].header.title;
        this.content = response.content[0].template_content;
        this.stuff = this.parserService.parseReport(response.content[0].template_content);
      }
    });
  }
  linkTo(address) {
   // this.iab.create(address, '_system');
  }
  getYouTubeLink(adress) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(adress);
  }
  showReport(config) {
    config['retrieve_data'] = true;
    config['scenario'] = 'export';
    delete config['report_setting_id'];
    this.connectService.postResource(this.reportlink, config).then(Response => {
      if (Response.chart !== undefined) {
        delete Response.chart.chart['height'];
        delete Response.chart.chart['width'];
        this.showModal(Response);
    }
  });
  }
  async showModal(Response) {
    const chartModal = await this.modalCtrl.create({
      component : ChartPage,
      componentProps : {result : Response } }) ;
    return chartModal.present();
  }

}
