import {Location} from "../entity/location";
import {POI} from "../entity/poi";

export class AdvertRest {
  public organizationName!: string;
  public startTime!: number;
  public shortDescription!: number;
  public longDescription!: number;
  public location!: Location;
  public advertTypeName!: string;
  public advertFileName!: string;
  public pois: POI[] = [];

  constructor() {
    this.location = new Location();
  }
}
