import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./create-orga/create-orga.module').then(m => m.CreateOrgaModule)
  },
  {
    path: 'partner',
    loadChildren: () => import('./partner-center/partner-center.module').then(m => m.PartnerCenterModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {
}
