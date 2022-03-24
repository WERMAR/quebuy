import {Location} from "./location";
import {OpeningHours} from "./opening-hours";

export class Organization {
  public organizationName!: string;
  public telephoneNumber!: string;
  public mail!: string;
  public ustId!: string;
  public commercialRegisterNumber!: string;
  public tradeLicence!: File;
  public location!: Location
  public organizationType!: string;
  public customQuestion!: string;
  public branchName!: string;
  public legalFormName!: string;
  public logo!: File;
  public openingHours: OpeningHours[];

  constructor() {
    this.openingHours = [];
    this.location = new Location();
  }
}
