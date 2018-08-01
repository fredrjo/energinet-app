import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { TranslationService } from '../services/translation.service';
import { ConnectService } from '../services/connect.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-page-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  alarm: any;
  newComment: string;
  link: string;
  public showSpinner: Boolean = false;
  title: string;
  delButton: string;
  delComments: any = [];
  details: any;
  options: any;

  constructor(
    // private params: NavParams,
    private modalCtrl: ModalController,
    private report: ReportService,
    // private view: ViewController,
    private loading: LoadingController,
    private connect: ConnectService,
    private toast: ToastController,
    private t: TranslationService) {
  }
  ngOnInit() {
    // this.alarm = this.params.get('alarm');
    // this.link = this.alarm.links.self['href'];
    // this.title = this.params.get('leave_a_comment');
    // this.delButton = this.params.get('delete');
    this.newComment = '';
    this.getResource(this.alarm.links.details['href']);
  }
  getResource(resource) {
      this.showSpinner = true;
      this.connect.getResource(resource).then(response => {
        this.details = response.content;
        if ((response.content[0].hasOwnProperty('report') && response.content[0].report.hasOwnProperty('chart')
        && response.content[0].report['chart'] != null )) {
          this.report.makeReport(response.content).then(res => {
            this.showSpinner = false;
            this.options = res[0];
            delete this.options.chart['height'];
            delete this.options.chart['width'];
          });
        } else {
          this.showSpinner = false;
        }
      });
    }
    dismiss() {
      // this.view.dismiss();
    }
async saveComment(payload) {
  const data = {'link': this.link, 'payload' : payload};
  const message = await this.toast.create({
    message: this.t.translate('settings', 'saved'),
      duration: 3000,
      position: 'top'
    });
  message.present();
  // this.view.dismiss(data);
  }
 onSubmit(status) {
   let payload = {};
   if (status) {
     payload = {'notes': [{'text' : this.newComment}], 'isPending' : true };
   } else {
     payload = {'notes': [{'text' : this.newComment}], 'isChecked' : true };
   }
   this.saveComment(payload);
 }
 deleteComment(comment) {
    const index = this.alarm.notes.indexOf(comment);
    if (index > -1) {
      this.alarm.notes.splice(index, 1);
    }
    this.delComments.push(comment.id);
    this.connect.deleteResource('/api/notes/' + comment.id);
  }
}
