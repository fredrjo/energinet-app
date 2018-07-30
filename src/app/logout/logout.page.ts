import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../app/services/auth.service';
import { TranslationService } from '../../app/services/translation.service';

@Component({
  selector: 'app-page-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild('content') content;
  constructor(private auth: AuthService, private t: TranslationService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.auth.logout();
    setTimeout(function() {
      location.reload();
    }, 500);
  }
  ngAfterContentInit() {
    this.content.resize();
  }

}
