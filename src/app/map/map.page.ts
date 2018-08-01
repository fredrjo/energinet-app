import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ConnectService } from '../../app/services/connect.service';
import { AlarmsPage } from '../alarms/alarms.page';
import { TranslationService } from '../services/translation.service';
declare const google: any;

@Component({
  selector: 'app-page-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  link: any;
  myMap: any = null;
  buildings: any = null;
  @ViewChild('map') mapElement;
  map: any;
  title: string;
  noMap: Boolean = false;
  message: any;

  constructor(
    private navCtrl: NavController,
    private t: TranslationService,
    private loadingCtrl: LoadingController,
    private connectService: ConnectService) {
  }

   ngOnInit() {
    this.link = '/api/map';
    this.title = 'Map';
     this.getResource(this.link);
   }
   async getResource(resource) {
    if (this.myMap == null) {
        const loading = await this.loadingCtrl.create({
        content: 'loading' //  this.t.translate('general', 'loading')
      });
      loading.present();
      this.connectService.getResource(resource).then(response => {
        if (response.content[0].map !== undefined && response.content[0].map.length > 0 ) {
          this.myMap = response.content;
          this.buildings = this.myMap[0].map;
          loading.dismiss();
          this.initMap();
        } else {
          loading.dismiss();
          this.noMap = true;
          this.title = response.content[0].header.title;
          this.message = response.content[0].header.subtitle + '. ' + response.content[0].header.description;
        }
      });
    }
  }
  initMap() {
    const latLng = new google.maps.LatLng(this.buildings[0].mapLocation.latitude, this.buildings[0].mapLocation.longitude);
    const mapOptions = {
      center : latLng,
      zoom : 11,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    for (let i = 0; i < this.buildings.length; i++) {
        this.addMarker(this.buildings[i].mapLocation.latitude, this.buildings[i].mapLocation.longitude,
        this.buildings[i].cardinality, this.buildings[i]);
    }
  }
  addMarker(lat, long, alarms, obj) {
    const latLng = new google.maps.LatLng(lat, long);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon : 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + alarms + '|ffffff|000000',
      url : obj
    });
    if (alarms > 0) {
      this.addLink(marker);
    }
  }
  addLink(marker) {
    google.maps.event.addListener(marker, 'click', () => {
      this.navCtrl.goForward('/AlarmsPage'); // , {item : marker.url});
    });
  }

}
