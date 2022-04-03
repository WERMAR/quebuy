import {OpeningHours} from "../db/entity/opening-hours";
import {OpeningHoursRest} from "../db/rest/opening-hours.rest";

export class OpeningHoursConverter {

  public static toRestObj(openingHours: OpeningHours[]): OpeningHoursRest[] {
    const openingHoursRest: OpeningHoursRest[] = [];
    openingHours.forEach(e => {
      const openHoursRestData: OpeningHoursRest = new OpeningHoursRest();
      switch (e.weekday) {
        case "Montag": {
          openHoursRestData.weekday = WeekDays.MONDAY;
          break;
        }
        case "Dienstag": {
          openHoursRestData.weekday = WeekDays.TUESDAY;
          break;
        }
        case "Mittwoch": {
          openHoursRestData.weekday = WeekDays.WEDNESDAY;
          break;
        }
        case "Donnerstag": {
          openHoursRestData.weekday = WeekDays.THURSDAY;
          break;
        }
        case "Freitag": {
          openHoursRestData.weekday = WeekDays.FRIDAY;
          break;
        }
        case "Samstag": {
          openHoursRestData.weekday = WeekDays.SATURDAY;
          break;
        }
        case "Sonntag": {
          openHoursRestData.weekday = WeekDays.SUNDAY;
          break;
        }
      }
      openHoursRestData.startTime = e.startTime
      openHoursRestData.endTime = e.endTime
      openHoursRestData.closed = e.closed
      openingHoursRest.push(openHoursRestData);
    });
    return openingHoursRest;
  }


}

enum WeekDays {
  MONDAY = "MO",
  TUESDAY = "TU",
  WEDNESDAY = "WE",
  THURSDAY = "TH",
  FRIDAY = "FR",
  SATURDAY = "SA",
  SUNDAY = "SU"
}
