package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
@Accessors(chain = true)
public class OrganizationRestData {
    private BigInteger id;
    private String organizationName;
    private String telephoneNumber;
    private String mail;
    private String ustId;
    private String commercialRegisterNumber;
    private LocationRestData location;
    private String organizationType;
    private String customQuestion;
    private String branchName;
    private String legalFormName;
    private String logoFileName;
    private String tradeLicenceFileName;
    private List<OpeningHoursRestData> openingHours;
}
