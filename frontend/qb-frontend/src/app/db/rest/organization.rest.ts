import {Location} from "../entity/location";
import {OpeningHours} from "../entity/opening-hours";

export class OrganizationRest {
  public id!: number;
  public organizationName!: string;
  public telephoneNumber!: string;
  public mail!: string;
  public ustId!: string;
  public commercialRegisterNumber!: string;
  public tradeLicenceFileName!: string;
  public location!: Location
  public organizationType!: string;
  public customQuestion!: string;
  public branchName!: string;
  public legalFormName!: string;
  public logoFileName!: string;
  public openingHours!: OpeningHours[];


  constructor() {
    this.location = new Location();
  }
}
