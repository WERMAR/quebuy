package de.youmesh.quebuy.util.converter;

import de.youmesh.quebuy.api.data.POIRestData;
import de.youmesh.quebuy.conf.annotations.Util;
import de.youmesh.quebuy.db.entity.Advert;
import de.youmesh.quebuy.db.entity.POI;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Util
@RequiredArgsConstructor
public class POIRestConverter implements RestConverter<POI, POIRestData> {

    public List<POI> toEntityObjectList(List<POIRestData> restData) {
        return restData.stream().map(this::toEntityObject).collect(Collectors.toList());
    }

    public List<POIRestData> toRestDataList(List<POI> data) {
        return data.stream().map(this::toRestObject).collect(Collectors.toList());
    }

    @Override
    public POI toEntityObject(POIRestData data) {
        POI poi = new POI();
        poi.setName(data.getName());
        poi.setHotspot(data.isHotspot());
        poi.setLocation(createGeometryLocation(data.latitude, data.longitude));
        return poi;
    }

    private Point createGeometryLocation(double latitude, double longitude) {
        Point point = new GeometryFactory().createPoint(new Coordinate(longitude, latitude));
        point.setSRID(4326);
        return point;
    }

    @Override
    public POIRestData toRestObject(POI data) {
        return new POIRestData()
                .setLatitude(data.getLocation().getY())
                .setLongitude(data.getLocation().getX())
                .setName(data.getName())
                .setHotspot(data.isHotspot())
                .setAdverts(data.getAdverts().stream().map(Advert::getId).collect(Collectors.toList()).toArray(BigInteger[]::new));
    }
}
