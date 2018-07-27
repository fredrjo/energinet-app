import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { ReportService } from '../../app/services/report.service';
import { TranslationService } from '../../app/services/translation.service';
@Component({
  selector: 'app-page-scorecard',
  templateUrl: './scorecard.page.html',
  styleUrls: ['./scorecard.page.scss'],
})
export class ScorecardPage implements OnInit {
  item : any;
  options : any;
  data : any;
  title : string ='';
  tabBarElement : any;
  cardBoxes : any;
  reportname : string ="";

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams, 
    private t:TranslationService, 
    private connectService:ConnectService, 
    private loadingCtrl:LoadingController, 
    private repServe:ReportService) {
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  ngOnInit() {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.item = this.navParams.get('item');
    this.reportname = this.item.header.title;
    this.getResource(this.item.links.self.href);
  }
   getResource(resource){
       let loading = this.loadingCtrl.create({
       content: this.t.translate('general','loading')
      });
      loading.present();
      this.connectService.getResource(resource).then(response => {
        loading.dismiss();
     
        if (response.status == undefined) {
          if (response.content[0].report !=undefined) {
            this.cardBoxes = response.content[0].report.summary;
            this.repServe.makeReport(response.content).then(res =>{
            this.title = response.header.title;
            this.options = res[0];
            delete this.options.chart['height'];
            delete this.options.chart['width'];
          })
        }
        else {
          this.cardBoxes =response.content[0].header.description;
          this.options = [];
        }
      }
    });
     
   }

}
