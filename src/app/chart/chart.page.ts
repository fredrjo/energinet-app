import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-page-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  options: Object;
  title: string;

  constructor(private navCtrl: NavController) {
  }
  ngOnInit() {
    this.title = 'Dummy'; // this.navParams.get('result').name;
    this.options = []; // this.navParams.get('result').chart;
  }
  dismiss() {
   // this.view.dismiss();
  }
}
