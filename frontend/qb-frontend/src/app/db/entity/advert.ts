import {Location} from "./location";
import {AdvertType} from "./advert-type";
import {POI} from "./poi";

export class Advert {
  public organizationName!: string;
  public startTime!: number;
  public shortDescription!: string;
  public longDescription!: string;
  public location: Location;
  public advertTypeName!: string;
  public advertFile!: File;
  public deleted!: boolean
  public pois: POI[] = [];

  constructor() {
    this.location = new Location();
  }
}
