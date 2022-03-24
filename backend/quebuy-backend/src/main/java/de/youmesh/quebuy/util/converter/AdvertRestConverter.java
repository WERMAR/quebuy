package de.youmesh.quebuy.util.converter;

import de.youmesh.quebuy.api.data.AdvertRestData;
import de.youmesh.quebuy.api.data.mobile.AdvertMobile;
import de.youmesh.quebuy.api.data.mobile.LocationMobile;
import de.youmesh.quebuy.api.data.mobile.OrganizationDetailsMobile;
import de.youmesh.quebuy.conf.annotations.Util;
import de.youmesh.quebuy.db.entity.Advert;
import de.youmesh.quebuy.db.entity.Location;
import de.youmesh.quebuy.db.entity.Organization;
import de.youmesh.quebuy.service.AdvertTypeService;
import de.youmesh.quebuy.service.FileService;
import de.youmesh.quebuy.service.OrganizationService;
import lombok.RequiredArgsConstructor;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Util
@RequiredArgsConstructor
public class AdvertRestConverter implements RestConverter<Advert, AdvertRestData> {

    private final OrganizationService organizationService;
    private final LocationRestConverter locationRestConverter;
    private final AdvertTypeService advertTypeService;
    private final FileService fileService;
    private final POIRestConverter poiRestConverter;
    private final OpeningHoursConverter openingHoursConverter;

    @Override
    public Advert toEntityObject(AdvertRestData data) {
        return new Advert()
                .setOrganization(organizationService.getOrganizationForName(data.getOrganizationName()))
                .setStartTime(new Date(data.getStartTime()))
                .setShortDescription(data.getShortDescription())
                .setLongDescription(data.getLongDescription())
                .setLocation(locationRestConverter.toEntityObject(data.getLocation()))
                .setAdvertType(this.advertTypeService.getAdvertTypeForName(data.getAdvertTypeName()))
                .setFiles(List.of(this.fileService.getFileForName(data.getAdvertFileName())))
                .setDeleted(false)
                .setPoiList(this.poiRestConverter.toEntityObjectList(data.getPois()));
    }

    @Override
    public AdvertRestData toRestObject(Advert data) {
        return new AdvertRestData()
                .setOrganizationName(data.getOrganization().getOrganizationName())
                .setStartTime(data.getStartTime().getTime())
                .setShortDescription(data.getShortDescription())
                .setLongDescription(data.getLongDescription())
                .setLocation(this.locationRestConverter.toRestObject(data.getLocation()))
                .setAdvertTypeName(data.getAdvertType().getName())
                .setAdvertFileName(data.getFiles().get(0).getFileName())
                .setPois(this.poiRestConverter.toRestDataList(data.getPoiList()));
    }

    public AdvertMobile toMobileRest(Advert advert) {
        return new AdvertMobile()
                .setId(advert.getId())
                .setShortDescription(advert.getShortDescription())
                .setLongDescription(advert.getLongDescription())
                .setOrganizationDetails(createOrganizationDetails(advert.getOrganization()))
                .setLocation(createLocation(advert.getLocation()));
    }

    private LocationMobile createLocation(Location location) {
        return new LocationMobile()
                .setPostcode(location.getPostcode())
                .setCountryName(location.getCountryName())
                .setVillage(location.getVillage())
                .setStreetName(location.getStreetName());
    }

    private OrganizationDetailsMobile createOrganizationDetails(Organization organization) {
        return new OrganizationDetailsMobile()
                .setOrganizationName(organization.getOrganizationName())
                .setLogoName(organization.getLogo().getFileName())
                .setOpeningHours(organization.getOpeningHoursList()
                        .stream()
                        .map(this.openingHoursConverter::toRestObject).collect(Collectors.toList()))
                .setMail(organization.getMail())
                .setTelephoneNumber(organization.getTelephoneNumber());

    }
}
