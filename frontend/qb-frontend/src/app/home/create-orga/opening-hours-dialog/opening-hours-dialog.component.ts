import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OpeningHoursDataDialog} from "./opening-hours.data.dialog";
import {OpeningHours} from "../../../db/entity/opening-hours";
import {WeekSelect, wholeWeek} from "../../../util/data/days.data";
import {MatListOption} from "@angular/material/list";

// TODO bug in dialog when click on weekend select
@Component({
  selector: 'dialog-opening-hours-dialog',
  templateUrl: './opening-hours-dialog.component.html',
  styleUrls: ['./opening-hours-dialog.component.css']
})
export class OpeningHoursDialogComponent implements OnInit {

  openingHoursData: OpeningHours[] = [];
  private _createNewOpeningHours: boolean = false;
  private _inputData: boolean = false;
  allDays: WeekSelect[] = wholeWeek;
  startHours: Date = new Date();
  endHours!: Date;
  wholeWeek = false;
  weekEnd = false;
  week = false;

  get createNewOpeningHours() {
    return this._createNewOpeningHours;
  }

  get inputData() {
    return this._inputData;
  }

  constructor(public dialogRef: MatDialogRef<OpeningHoursDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: OpeningHoursDataDialog) {
  }

  ngOnInit(): void {
    this._inputData = this.data !== undefined && this.data !== null;
    this.openingHoursData = this.data?.openingHours;
    if (this.openingHoursData === undefined) {
      this.openingHoursData = []
    }
  }


  onCreateNewOpeningHours() {
    this._createNewOpeningHours = true;
    this.week = false;
    this.weekEnd = false;
    this.wholeWeek = false;
    this.allDays.forEach(t => t.activated = false);
  }

  onAddNewOpeningHours() {
    this._createNewOpeningHours = false;
    this.allDays.forEach(t => {
      if (t.activated) {
        let openingHour = new OpeningHours();
        openingHour.weekday = t.name;
        openingHour.closed = false;
        openingHour.startTime = this.startHours.getTime();
        openingHour.endTime = this.endHours.getTime();
        this.openingHoursData.push(openingHour)
      }
    })
  }

  updateAllComplete() {
    if (this.allDays != null && this.allDays.every(t => t.activated)) {
      this.wholeWeek = true;
      this.weekEnd = false;
      return;
    } else if (this.allDays != null
      && (this.allDays.filter(t => (t.name === 'Samstag' || t.name === 'Sonntag') && t.activated).length === 2
        && this.allDays.filter(t => t.activated).length === 2)) {
      this.weekEnd = true;
      this.wholeWeek = false;
      this.week = false;
    } else if (this.allDays != null
      && (this.allDays.filter(t => (t.name !== 'Samstag' && t.name !== 'Sonntag') && t.activated).length === 5
        && this.allDays.filter(t => t.activated).length === 5)
    ) {
      this.week = true;
      this.weekEnd = false;
      this.wholeWeek = false;
    } else {
      this.week = false;
      this.weekEnd = false;
      this.wholeWeek = false;
    }
  }

  completeWholeWeek(): boolean {
    if (this.allDays == null) {
      return false;
    }
    let selectedDates = this.allDays.filter(t => t.activated).length;
    return selectedDates > 5 && selectedDates < 7 && !this.wholeWeek;
  }

  completeWeekEnd() {
    if (this.allDays == null) {
      return false;
    }
    if (this.allDays.filter(t => (t.name !== 'Samstag' && t.name !== 'Sonntag') && t.activated).length !== this.allDays.filter(t => t.activated).length && this.allDays.filter(t => t.activated).length < 2) {
      let selectedDates = this.allDays.filter(t => t.activated && (t.name === 'Samstag' || t.name === 'Sonntag')).length;
      return selectedDates > 0 && selectedDates < 2 && !this.weekEnd;
    }
    return false;
  }

  completeWeek() {
    if (this.allDays == null) {
      return false;
    }
    if (this.allDays.filter(t => (t.name === 'Samstag' || t.name === 'Sonntag') && t.activated).length > 0) {
      return false;
    }
    let selectedDates = this.allDays.filter(t => (t.name !== 'Samstag' && t.name !== 'Sonntag') && t.activated).length;
    return selectedDates > 0 && selectedDates < 6 && !this.week;
  }

  setAll(completed: boolean, type: string) {
    switch (type) {
      case 'week': {
        this.week = completed;
        this.weekEnd = false;
        this.wholeWeek = false;
        this.allDays.forEach(t => {
          t.activated = completed && t.name !== 'Samstag' && t.name !== 'Sonntag';
        });
        break;
      }
      case 'weekend': {
        this.weekEnd = completed;
        this.week = false;
        this.wholeWeek = false;
        this.allDays.forEach(t => {
          t.activated = completed && t.name === 'Samstag' || t.name === 'Sonntag';
        });
        break;
      }
      case 'all': {
        this.wholeWeek = completed;
        this.week = false;
        this.weekEnd = false;
        this.allDays.forEach(t => {
          t.activated = completed;
        });
        break;
      }
    }
  }

  onCloseDialog() {
    this.dialogRef.close(this.openingHoursData)
  }

  onEditSelection(selection: MatListOption[]) {
    console.log(selection);
  }
}
