import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },  { path: 'buildings', loadChildren: './buildings/buildings.module#BuildingsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
