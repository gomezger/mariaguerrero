import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'panel', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule) },
  { path: '', loadChildren: () => import('./web/web.module').then(m => m.WebModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
