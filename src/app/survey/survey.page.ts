import { AbstractControl } from '@angular/forms/forms';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController  } from '@ionic/angular';
import { ConnectService } from '../services/connect.service';
import { TranslationService } from '../services/translation.service';

function maxValue(max: Number) {
  return (control: AbstractControl): {[key: string]: any} => {
    const input = control.value,
          isValid = input > max;
    if (isValid) {
        return { 'maxValue': {max} };
    } else {
      return null;
    }
  };
}

function minValue(min: Number) {
  return (control: AbstractControl): {[key: string]: any} => {
    const input = control.value,
          isValid = input < min;
    if (isValid) {
      return { 'minValue': {min} };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-page-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  form: any = null;
  title: String = '';
  sendTo: String = '';
  sendAs: String = '';
  myForm: any = null;
  survey: FormGroup = new FormGroup({}) ;
  submitted = false;
  ego: any = '';
  name: any = '';
  checkThis: FormArray = new FormArray([]);
  isValid: Boolean = false;
  link: any;
  parent: any ;
  header: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private t: TranslationService,
    private connectService: ConnectService,
    private toast: ToastController) {
  }
  ngOnInit() {
    this.link = this.navParams.get('item').links.self.href;
    this.header = this.navParams.get('title');
    this.parent = this.navParams.get('item').links;
    this.getResource(this.link);
  }
  getResource(resource){
    if (this.form == null) {
      this.connectService.getResource(resource).then(response => {
        this.form = response.content[0].form.formElements;
        this.title = response.content[0].form.header.title;
        this.sendTo = response.content[0].form.links.self.href;
        this.sendAs = response.content[0].form.links.self.verb;
        this.buildForm();
      });
    }
  }

  buildForm() {
    const group: any = {};
    this.form.forEach (question => {
      group[question.name] = new FormControl(question.value, Validators.compose(this.getValidators(question))) ;
    });
     this.survey = new FormGroup(group);
  }
  getValidators(question) {
    const validators = [];
    for (let i = 0; i < question.validators.length; i++) {
      const stuff = JSON.stringify(question.validators[i]);

      if (stuff.indexOf('required') > -1) {
        validators.push(Validators.required);
      }
      if ((stuff.indexOf('length') > -1) && stuff.indexOf('max') > -1)  {
        validators.push(Validators.maxLength(question.validators[i].max));
      }
      if ((stuff.indexOf('length') > -1) && stuff.indexOf('min') > -1)  {
        validators.push(Validators.minLength(question.validators[i].min));
      }
      if ((stuff.indexOf('value') > -1) && stuff.indexOf('max') > -1)  {
        validators.push(maxValue(question.validators[i].max));
      }
      if ((stuff.indexOf('value') > -1) && stuff.indexOf('min') > -1)  {
        validators.push(minValue(question.validators[i].min));
      }
    }
    return validators;
  }

  onValueChanged(data) {
    this.survey.controls[data[0]].setValue(data[1]);
    if (this.survey.status === 'VALID') {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }
  async send() {
    for (let i = 0; i < this.form.length; i++) {
        this.form[i].value = this.survey.controls[this.form[i].name].value;
    }
    let res;
    if (this.sendAs === 'PUT') {
       res = this.connectService.putResource(this.sendTo, '{"formElements" :' + JSON.stringify(this.form) + '}' );
    } else {
        res = this.connectService.postResource(this.sendTo, '{"formElements" :' + JSON.stringify(this.form) + '}' );
    }
    const message = await this.toast.create({
      message: this.t.translate('settings', 'saved'),
      duration: 3000,
      position: 'top'
    });
    message.present();
    return;
  }
  getItemsForInput() {
    return this.form;
  }

  makeFormFromModel() {
    for (let i = 0 ; i < this.form.length; i++) {
      const stuff = new FormControl(this.form[i]);
      this.checkThis.push(stuff);
    }
  }
  writeError(stuff) {
    if (stuff.minValue !== undefined) {
      return this.t.translate('validation', 'min') + ' ' + stuff.minValue.min;
    }
    if (stuff.maxValue !== undefined) {
      return this.t.translate('validation', 'max') + ' ' + stuff.maxValue.max;
    }
     if (stuff.maxlength !== undefined) {
      return this.t.translate('validation', 'maxLength') + ' ' + stuff.maxlength.requiredLength;
    }
     if (stuff.minlength !== undefined) {
      return this.t.translate('validation', 'minLength') + ' ' + stuff.minlength.requiredLength;
    }
     if (stuff.required !== undefined) {
      return this.t.translate('validation', 'required');
    }
    return 'something is messed up - call an ambulance!';
  }

}
