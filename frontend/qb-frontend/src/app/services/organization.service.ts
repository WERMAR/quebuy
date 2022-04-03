import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Organization} from "../db/entity/organization";
import {HttpClient} from "@angular/common/http";
import {CacheService} from "./cache.service";
import {FileService} from "./file.service";
import {OrganizationRest} from "../db/rest/organization.rest";
import {OpeningHoursConverter} from "../util/opening-hours.converter.util";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends HttpService {

  constructor(private _httpService: HttpClient, _cacheService: CacheService, private _fileService: FileService) {
    super(_cacheService);
  }


  public createOrganization(organization: OrganizationRest) {
    return this._httpService.post(this.LOCAL_URL + '/internal/organization/create', organization, this.createStandardHeaderWithAuthorization())
  }

  public getOrganizations() {
    return this._httpService.get<OrganizationRest[]>(this.LOCAL_URL + '/internal/organization/all', this.createStandardHeaderWithAuthorization());
  }

  public static createOrganizationRestObject(organization: Organization, fileNameTradeLicence: string, logoFileName: string): OrganizationRest {
    const organizationRest = new OrganizationRest();
    organizationRest.organizationName = organization.organizationName;
    organizationRest.mail = organization.mail;
    organizationRest.telephoneNumber = organization.telephoneNumber;
    organizationRest.location.village = organization.location.village;
    organizationRest.location.streetName = organization.location.streetName;
    organizationRest.location.countryName = organization.location.countryName;
    organizationRest.location.zipCode = organization.location.zipCode;
    organizationRest.organizationType = 'SPX'
    organizationRest.ustId = organization.ustId;
    organizationRest.legalFormName = organization.legalFormName;
    organizationRest.branchName = organization.branchName;
    organizationRest.logoFileName = logoFileName;
    organizationRest.tradeLicenceFileName = fileNameTradeLicence;
    organizationRest.commercialRegisterNumber = organization.commercialRegisterNumber;
    organizationRest.openingHours = OpeningHoursConverter.toRestObj(organization.openingHours);
    return organizationRest;
  }

}
