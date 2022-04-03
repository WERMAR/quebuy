import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Organization} from "../../../db/entity/organization";

@Component({
  selector: 'app-summary-orga',
  templateUrl: './summary-orga.component.html',
  styleUrls: ['./summary-orga.component.css']
})
export class SummaryOrgaComponent implements OnInit {

  @Input() organization!: Organization;
  @Input() logoUrl: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
