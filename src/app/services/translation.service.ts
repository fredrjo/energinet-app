import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnInit {

  localizationUrl: any = 'applocalization.js';
  dictionary: any = [];
  lang: any = 'en_US';

  constructor(private storage: Storage, private http: HttpClient) {
       this.storage.get('language').then((phrases => {
          if (phrases != null) {
              this.lang = phrases;
          }
      }));
      this.http.get('assets/language.json').toPromise().then(res => {
          this.dictionary = res;
      });
  }
  ngOnInit() {
  }
  getDictionary(langcode) {
  }
  translate(category, phrase) {
      if (typeof this.dictionary[this.lang][category][phrase] === 'undefined') {
          return phrase;
      } else {
          return this.dictionary[this.lang][category][phrase];
      }
  }
  getNoobLanguageCode(language) {
      return this.dictionary[language]['general']['energinet_lang_code'];
  }
}
