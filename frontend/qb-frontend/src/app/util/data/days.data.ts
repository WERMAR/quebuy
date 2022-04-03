export var wholeWeek: WeekSelect[] = [
  {name: 'Montag', activated: false, color: 'warn'},
  {name: 'Dienstag', activated: false, color: 'warn'},
  {name: 'Mittwoch', activated: false, color: 'warn'},
  {name: 'Donnerstag', activated: false, color: 'warn'},
  {name: 'Freitag', activated: false, color: 'warn'},
  {name: 'Samstag', activated: false, color: 'warn'},
  {name: 'Sonntag', activated: false, color: 'warn'},
];

export interface WeekSelect {
  name: string;
  activated: boolean;
  color: string;
}
