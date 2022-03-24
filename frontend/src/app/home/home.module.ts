import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from "./home.component";
import {HomePageRoutingModule} from "./home-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { PartnerCenterComponent } from './partner-center/partner-center.component';
import {MatListModule} from "@angular/material/list";
import {MatRippleModule} from "@angular/material/core";
import {PartnerCenterModule} from "./partner-center/partner-center.module";


@NgModule({
  imports: [
    HomePageRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    PartnerCenterModule
  ],
  declarations: [HomeComponent, PartnerCenterComponent]
})
export class HomePageModule {
}
