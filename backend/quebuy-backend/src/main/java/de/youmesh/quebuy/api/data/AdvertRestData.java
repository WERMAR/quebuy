package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
public class AdvertRestData {
    private String organizationName;
    private Long startTime;
    private String shortDescription;
    private String longDescription;
    private LocationRestData location;
    private String advertTypeName;
    private String advertFileName;
    private List<POIRestData> pois;
}
