import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {OrganizationService} from "../../services/organization.service";
import {OrganizationRest} from "../../db/rest/organization.rest";
import {Observable} from "rxjs";
import {startWith} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-orga',
  templateUrl: './partner-center.component.html',
  styleUrls: ['./partner-center.component.css']
})
export class PartnerCenterComponent implements OnInit {

  private _organizations!: OrganizationRest[];
  private _selectedPartner!: OrganizationRest;

  get organizations() {
    return this._organizations;
  }

  get selectedPartner() {
    return this._selectedPartner;
  }

  constructor(private _router: Router,
              private _organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    this._organizationService.getOrganizations().subscribe(response => {
      this._organizations = response
      console.log(this._organizations)
    })
  }

  onBack() {
    this._router.navigateByUrl('/home').then();
  }

  onSelectPartner(organization: OrganizationRest) {
    this._selectedPartner = organization;
  }
}
