import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PartnerCenterComponent} from "./partner-center.component";

const routes: Routes = [
  {
    path: '',
    component: PartnerCenterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerCenterRoutingModule {
}
