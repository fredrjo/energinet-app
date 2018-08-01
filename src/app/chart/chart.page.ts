import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  options: Object;
  title: string;

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.title = 'Dummy'; // this.navParams.get('result').name;
    this.options = []; // this.navParams.get('result').chart;
  }
  dismiss() {
   // this.view.dismiss();
  }
}
