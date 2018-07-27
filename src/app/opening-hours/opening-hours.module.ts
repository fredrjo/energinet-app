import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpeningHoursPage } from './opening-hours.page';

const routes: Routes = [
  {
    path: '',
    component: OpeningHoursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OpeningHoursPage]
})
export class OpeningHoursPageModule {}
