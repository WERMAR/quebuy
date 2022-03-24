package de.youmesh.quebuy.api.data.mobile;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigInteger;

/**
 * This class used for the json mapping, suitable the mobile interface description
 */
@Getter
@Setter
@Accessors(chain = true)
public class AdvertMobile {

    private BigInteger id;
    private String shortDescription;
    private String longDescription;
    private LocationMobile location;
    private OrganizationDetailsMobile organizationDetails;

}
