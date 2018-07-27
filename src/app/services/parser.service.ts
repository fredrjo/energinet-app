import { SettingsService } from './settings.service';
import { Injectable, OnInit } from '@angular/core';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParserService implements OnInit {

  report: any;
  today: Date = new Date();
  month: String;
  baseUrl: String = 'https://www.energinet.net:8000/backend/';

  constructor(private settings: SettingsService ) {
    const locale = this.settings.getLanguage().replace('_', '-');
    this.month = this.today.toLocaleString(locale, { month: 'long' });
  }
  ngOnInit () {

  }
  parseReport(report) {
    const parsed = JSON.parse(report);
    const html = [];
    for (let i = 0; i < parsed.sections.length; i++) {
      html[i] = this.parseSection(parsed.sections[i]);
    }
    return html;
  }
  parseSection(section) {
    const html = [];
    const mySection = section ;
    for (let i = 0; i < mySection.placeholders.length; i++) {
      html[i] = this.parsePlaceholder(mySection.placeholders[i]);
    }
    return html;
  }
  parsePlaceholder(placeholder) {
    const html = [];
    for (let i = 0; i < placeholder.elements.length; i++) {
      if (placeholder.elements[i].type === 3) {
        html[i] = [];
        this.personalize(placeholder.elements[i].html).then((text) => {
          html[i] = [4 , text];
        })
        .catch(function err(re) { console.log('fail'); } );
      } else if (placeholder.elements[i].type === 0) {
        html[i] = [0, '<img src="' + this.baseUrl + placeholder.elements[i].src + '" />'];
      } else if (placeholder.elements[i].type === 4 ) {
        html[i] = [3, placeholder.elements[i].url, placeholder.elements[i].text];
      } else if (placeholder.elements[i].type === 5) {
        html[i] = [5, '<p>Innhold</p>'];
      } else if (placeholder.elements[i].type === 1) {
        html[i] = [1, '<hr />'];
      } else if (placeholder.elements[i].type === 2) {
        html[i] = [2, '<hr />'];
      } else if (placeholder.elements[i].type === 6) {
        html[i] = [6, placeholder.elements[i].config, placeholder.elements[i].config.name ];
      }
    }
    return html;
  }
  personalize(wallText) {
    return this.settings.getUser().then((user) => {
      const phrases = ['%UserLastName%', '%UserFirstName%', '%UserFullName%', '%UserEmail%', '%CustomerName%'];
      // 'CurrentDate', 'CurrentYear', 'CurrentYearMonth'];
      const userdata = [user.last_name, user.first_name, user.first_name + ' ' + user.last_name, user.email, user.customer_name];
      for (let i = 0; i < phrases.length; i++) {
        wallText = wallText.split(phrases[i]).join(userdata[i]);
      }
      wallText = wallText.split('%CurrentDate%').join(this.month + ' ' + this.today.getDate());
      wallText = wallText.split('%CurrentYear%').join(this.today.getFullYear());
      wallText = wallText.split('%CurrentYearMonth%').join(this.month + ' ' + this.today.getFullYear());
      return wallText;
    })
    .catch( function err () {
      console.log('fail');
    });
  }
}
