package de.youmesh.quebuy.util.converter;

import de.youmesh.quebuy.api.data.OrganizationRestData;
import de.youmesh.quebuy.conf.annotations.Util;
import de.youmesh.quebuy.db.entity.Organization;
import de.youmesh.quebuy.service.BranchService;
import de.youmesh.quebuy.service.FileService;
import de.youmesh.quebuy.service.LegalFormService;
import de.youmesh.quebuy.service.OrganizationTypeService;
import lombok.RequiredArgsConstructor;

@Util
@RequiredArgsConstructor
public class OrganizationRestConverter implements RestConverter<Organization, OrganizationRestData> {

    private final LocationRestConverter locationRestConverter;
    private final FileService fileService;
    private final LegalFormService legalFormService;
    private final OrganizationTypeService organizationTypeService;
    private final BranchService branchService;
    private final OpeningHoursConverter openingHoursConverter;

    @Override
    public Organization toEntityObject(OrganizationRestData data) {
        return new Organization()
                .setId(data.getId())
                .setOrganizationName(data.getOrganizationName().trim())
                .setMail(data.getMail().trim())
                .setTelephoneNumber(data.getTelephoneNumber().trim())
                .setLocation(this.locationRestConverter.toEntityObject(data.getLocation()))
                .setUstId(data.getUstId().trim())
                .setCommercialRegisterNumber(data.getCommercialRegisterNumber().trim())
                .setTradeLicence(this.fileService.getFileForName(data.getTradeLicenceFileName().trim()))
                .setLogo(this.fileService.getFileForName(data.getLogoFileName().trim()))
                .setCustomQuestion(data.getCustomQuestion() != null ? data.getCustomQuestion().trim() : null)
                .setLegalForm(this.legalFormService.getLegalFormForName(data.getLegalFormName()))
                .setOrganizationType(this.organizationTypeService.getOrganizationTypeForName(data.getOrganizationType()))
                .setBranch(this.branchService.getBranchForName(data.getBranchName()))
                .setOpeningHoursList(this.openingHoursConverter.getOpeningHours(data.getOpeningHours()));
    }

    @Override
    public OrganizationRestData toRestObject(Organization data) {
        return new OrganizationRestData()
                .setId(data.getId())
                .setOrganizationName(data.getOrganizationName())
                .setOrganizationType(data.getOrganizationType().getName())
                .setMail(data.getMail())
                .setTelephoneNumber(data.getTelephoneNumber())
                .setLocation(this.locationRestConverter.toRestObject(data.getLocation()))
                .setUstId(data.getUstId())
                .setCommercialRegisterNumber(data.getCommercialRegisterNumber())
                .setTradeLicenceFileName(data.getTradeLicence().getFileName())
                .setLogoFileName(data.getLogo().getFileName())
                .setCustomQuestion(data.getCustomQuestion())
                .setLegalFormName(data.getLegalForm().getName())
                .setBranchName(data.getBranch().getName())
                .setOpeningHours(this.openingHoursConverter.getOpeningHoursRest(data.getOpeningHoursList()));
    }
}
