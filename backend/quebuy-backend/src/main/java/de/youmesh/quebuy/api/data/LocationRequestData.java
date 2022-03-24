package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class LocationRequestData {

    private double latitude;
    private double longitude;
    private int ratio;
}
