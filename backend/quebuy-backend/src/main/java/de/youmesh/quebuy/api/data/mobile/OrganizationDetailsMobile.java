package de.youmesh.quebuy.api.data.mobile;

import de.youmesh.quebuy.api.data.OpeningHoursRestData;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * This class used for the json mapping, suitable the mobile interface description
 */
@Getter
@Setter
@Accessors(chain = true)
public class OrganizationDetailsMobile {

    private String organizationName;
    private String telephoneNumber;
    private String mail;
    private String logoName;
    private List<OpeningHoursRestData> openingHours;
}
