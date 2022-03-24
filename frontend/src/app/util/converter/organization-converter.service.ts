import {Converter} from "./converter.interface";
import {Organization} from "../../db/entity/organization";
import {OrganizationRest} from "../../db/rest/organization.rest";
import {Injectable} from "@angular/core";

// TODO not finished implement or maybe it is not necessary
@Injectable({providedIn: "root"})
export class OrganizationConverter implements Converter<Organization, OrganizationRest> {


  toEntityObject(data: OrganizationRest): Organization {
    const organization = new Organization();
    organization.organizationName = data.organizationName;
    organization.organizationType = data.organizationType;
    organization.location = data.location;
    organization.mail = data.mail;
    organization.ustId = data.ustId;
    organization.telephoneNumber = data.telephoneNumber;
    organization.openingHours = data.openingHours;
    organization.branchName = data.branchName;
    organization.commercialRegisterNumber = data.commercialRegisterNumber;
    organization.legalFormName = data.legalFormName;
    organization.customQuestion = data.customQuestion;
    return organization;
  }

  toRestObject(data: Organization): OrganizationRest {
    const organizationRest = new OrganizationRest();
    organizationRest.organizationName = data.organizationName;
    organizationRest.organizationType = data.organizationType;
    organizationRest.location = data.location;
    organizationRest.ustId = data.ustId;
    organizationRest.branchName = data.branchName;
    organizationRest.openingHours = data.openingHours;
    organizationRest.telephoneNumber = data.telephoneNumber;
    organizationRest.mail = data.mail;
    organizationRest.tradeLicenceFileName = data.tradeLicence.name;
    organizationRest.logoFileName = data.logo.name;
    organizationRest.commercialRegisterNumber = data.commercialRegisterNumber;
    organizationRest.legalFormName = data.legalFormName;
    organizationRest.customQuestion = data.customQuestion;
    return organizationRest;
  }
}
