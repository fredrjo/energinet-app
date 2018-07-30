import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'api/myBuildings', loadChildren: './buildings/buildings.module#BuildingsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'api/buildingAlarms', loadChildren: './alarms/alarms.module#AlarmsPageModule' },
  { path: 'buildoptions', loadChildren: './buildoptions/buildoptions.module#BuildoptionsPageModule' },
  { path: 'chart', loadChildren: './chart/chart.module#ChartPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' },
  { path: 'opening-hours', loadChildren: './opening-hours/opening-hours.module#OpeningHoursPageModule' },
  { path: 'pending', loadChildren: './pending/pending.module#PendingPageModule' },
  { path: 'scanner', loadChildren: './scanner/scanner.module#ScannerPageModule' },
  { path: 'scorecard', loadChildren: './scorecard/scorecard.module#ScorecardPageModule' },
  { path: 'scorecardlist', loadChildren: './scorecardlist/scorecardlist.module#ScorecardlistPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'survey', loadChildren: './survey/survey.module#SurveyPageModule' },
  { path: 'wall', loadChildren: './wall/wall.module#WallPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
