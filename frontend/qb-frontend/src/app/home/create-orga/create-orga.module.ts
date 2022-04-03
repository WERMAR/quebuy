import {NgModule} from "@angular/core";
import {CreateOrgaComponent} from "./create-orga.component";
import {CreateOrgaRoutingModule} from "./create-orga-routing.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DndDirective} from "./directives/dnd.directive";
import {CommonModule} from "@angular/common";
import {SummaryOrgaComponent} from './summary-orga/summary-orga.component';
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {OpeningHoursDialogComponent} from './opening-hours-dialog/opening-hours-dialog.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {
  NgxMatTimepickerModule, NgxMatNativeDateModule
} from '@angular-material-components/datetime-picker';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {GoogleMapsModule} from "@angular/google-maps";


@NgModule({
    imports: [CreateOrgaRoutingModule, MatStepperModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule, MatListModule, MatExpansionModule, MatToolbarModule, MatProgressSpinnerModule, MatAutocompleteModule, MatOptionModule, MatSelectModule, MatDialogModule, NgxMatTimepickerModule, NgxMatNativeDateModule, FormsModule, MatCheckboxModule, MatDatepickerModule, GoogleMapsModule],
  declarations: [CreateOrgaComponent, DndDirective, SummaryOrgaComponent, OpeningHoursDialogComponent],
  exports: [DndDirective]
})
export class CreateOrgaModule {
}
