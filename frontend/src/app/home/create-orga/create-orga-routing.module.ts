import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CreateOrgaComponent} from "./create-orga.component";

const routes: Routes = [
  {
    path: '',
    component: CreateOrgaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateOrgaRoutingModule {
}
