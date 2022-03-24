package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class LocationRestData {
    private String streetName;
    private String zipCode;
    private String village;
    private String countryName;
}
