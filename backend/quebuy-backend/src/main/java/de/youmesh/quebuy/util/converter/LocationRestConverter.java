package de.youmesh.quebuy.util.converter;

import de.youmesh.quebuy.api.data.LocationRestData;
import de.youmesh.quebuy.conf.annotations.Util;
import de.youmesh.quebuy.db.entity.Location;

@Util
public class LocationRestConverter implements RestConverter<Location, LocationRestData> {

    @Override
    public Location toEntityObject(LocationRestData data) {
        return new Location()
                .setStreetName(data.getStreetName().trim())
                .setPostcode(data.getZipCode().trim())
                .setVillage(data.getVillage().trim())
                .setCountryName(data.getCountryName().trim());
    }

    @Override
    public LocationRestData toRestObject(Location data) {
        return new LocationRestData().setStreetName(data.getStreetName())
                .setZipCode(data.getPostcode())
                .setVillage(data.getVillage())
                .setCountryName(data.getCountryName());
    }
}
