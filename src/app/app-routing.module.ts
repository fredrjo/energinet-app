import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'api/buildingAlarms', loadChildren: './buildings/buildings.module#BuildingsPageModule', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'api/buildingAlarms/:id', loadChildren: './alarms/alarms.module#AlarmsPageModule' },
  { path: 'api/myBuildings', loadChildren: './buildoptions/buildoptions.module#BuildoptionsPageModule', pathMatch: 'full' },
  { path: 'chart', loadChildren: './chart/chart.module#ChartPageModule' },
  { path: 'api/dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'api/map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'opening-hours', loadChildren: './opening-hours/opening-hours.module#OpeningHoursPageModule' },
  { path: 'pending', loadChildren: './pending/pending.module#PendingPageModule' },
  { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerPageModule' },
  { path: 'api/scoreCard/:id', loadChildren: './scorecard/scorecard.module#ScorecardPageModule' },
  { path: 'api/myBuildings/:id', loadChildren: './scorecardlist/scorecardlist.module#ScorecardlistPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'survey', loadChildren: './survey/survey.module#SurveyPageModule' },
  { path: 'api/dashboard/:id', loadChildren: './wall/wall.module#WallPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
