import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { FormElementComponent } from './form-element/form-element.component';
import { LogoutComponent } from './logout/logout.component';
import { ScoreboxComponent } from './scorebox/scorebox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [CalendarComponent, FormElementComponent, LogoutComponent, ScoreboxComponent],
  entryComponents: [],
})
export class ComponentsModule {}
