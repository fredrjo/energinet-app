import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from '@ionic/angular';

@Component({
  selector: 'app-page-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  options: Object;
  title: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private view: ViewController) {
  }
  ngOnInit() {
    this.title = this.navParams.get('result').name;
    this.options = this.navParams.get('result').chart;
  }
  dismiss() {
    this.view.dismiss();
  }
}
