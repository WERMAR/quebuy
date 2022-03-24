import {NgModule} from "@angular/core";
import {PartnerCenterRoutingModule} from "./partner-center-routing.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {GoogleMapsModule} from "@angular/google-maps";
import { ViewPartnerComponent } from './view-partner/view-partner.component';


@NgModule({
  imports: [PartnerCenterRoutingModule, MatStepperModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule, MatListModule, MatExpansionModule, MatToolbarModule, MatProgressSpinnerModule, MatAutocompleteModule, MatOptionModule, MatSelectModule, MatDialogModule, NgxMatTimepickerModule, NgxMatNativeDateModule, FormsModule, MatCheckboxModule, MatDatepickerModule, GoogleMapsModule],
  declarations: [
    ViewPartnerComponent
  ],
    exports: [
        ViewPartnerComponent
    ]
})
export class PartnerCenterModule {
}
