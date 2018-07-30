import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes } from '@angular/animations';
import { ModalController, NavController, NavParams, LoadingController } from '@ionic/angular';
import { ConnectService } from '../services/connect.service';
import { TranslationService } from '../services/translation.service';
import { AlarmsService } from '../services/alarms.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-page-alarms',
  templateUrl: './alarms.page.html',
  styleUrls: ['./alarms.page.scss'],
  animations: [
    trigger('focusPanel', [
        state('inactive', style({
            transform: 'scale(1)',
            border: '0px'
        })),
        state('active', style({
            transform: 'scale(1)',
            border : '10px'
        })),
        transition('* => void', [
            animate(600, keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 0.5, transform: 'translateX(-25px)', offset: .25 }),
                style({ opacity: 0, transform: 'translateX(500px)', offset: 1 }),
            ]))
        ])
    ]),
]
})
export class AlarmsPage implements OnInit {
  item: any;
  alarms: any;
  link: any;
  state: string;
  cardinality: number;
  pending: number;
  message: any;
  isEmpty: boolean;
  constructor(
      private navCtrl: NavController,
      private params: NavParams,
      private connectService: ConnectService,
      private alarmSer: AlarmsService,
      private modalCtrl: ModalController,
      private loadingCtrl: LoadingController,
      private t: TranslationService) {
    }
    ngOnInit() {
        this.item = this.params.get('item');
        this.link = this.item.links.self.href;
        this.alarms = null;
        this.getResource(this.link);
        this.state = 'inactive';
        this.pending = 0;
        this.cardinality = 0;
        this.isEmpty = false;
    }
    ionViewDidEnter() {
        const storedAlarms = this.alarmSer.getBuildingsAlarms(this.link);
        if (storedAlarms !== null) {
            this.pending = storedAlarms.pending;
            this.cardinality = storedAlarms.cardinality;
        }
      }
    ionViewWillLeave() {
        this.setAlarms();
    }
    async getResource(resource) {
        if (this.alarms == null) {
            const loading = await this.loadingCtrl.create({
                content: this.t.translate('general', 'loading')
            });
            loading.present();
            this.connectService.getResource(resource).then(response => {
                if (response.content[0].designCue !== 'notice') {
                    this.alarms = response.content;
                } else {
                    this.message = response.content[0].header.description;
                    this.isEmpty = true;
                }
                loading.dismiss();
            });
        }
    }
    async presentProfileModal(alarm) {
        const profileModal = await this.modalCtrl.create({
            component : ModalPage,
            componentProps : {
                    alarm : alarm,
                    leave_a_comment : this.t.translate('contentElement', 'leave_a_comment'),
                    delete : this.t.translate('general', 'delete')},
            });
                return await profileModal.present();
    }
    removeAlarm(alarm) {
        const index = this.alarms.indexOf(alarm);
        if (this.alarms[index].isPending) {
            this.pending--;
            this.cardinality--;
        } else {
            this.cardinality--;
        }
        this.alarms[index].state = (this.alarms[index].state === 'inactive' ? 'active' : 'inactive');
        this.connectService.putResource(alarm.links.self.href, { isChecked : true }).then(response => {
            if (index > -1) {
                this.alarms.splice(index, 1);
            }
        });
    }
    postponeAlarm(alarm) {
        const index = this.alarms.indexOf(alarm);
        if (!this.alarms[index].isPending) {
            this.alarms[index].isPending = true;
            this.pending++;
        }
        this.connectService.putResource(alarm.links.self.href, { isPending : true }).then(response => {
            console.log(response);
        });
    }
    setAlarms() {
          this.alarmSer.setSpesificAlarms({
            link : this.link,
            cardinality : this.cardinality,
            pending : this.pending
          });
    }

}
