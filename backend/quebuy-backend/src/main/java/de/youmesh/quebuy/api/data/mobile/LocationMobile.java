package de.youmesh.quebuy.api.data.mobile;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

/**
 * This class used for the json mapping, suitable the mobile interface description
 */
@Getter
@Setter
@Accessors(chain = true)
public class LocationMobile {

    private String streetName;
    private String postcode;
    private String village;
    private String countryName;
}
