package de.youmesh.quebuy.api.data.mobile;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigInteger;

/**
 * This is class is only used as a Transfer-Object, to load the necessary Adverts for the Mobile-Device.
 *
 * <br><br><strong>Detail-Description:</strong><br>
 * The app load the POI depending on the current location. When the data has loaded, the app build out of this a list of all loaded adverts.
 * This class represent this saved list and is used for an easier communication via the api.
 *
 * @author wermar
 */
@Getter
@Setter
@Accessors(chain = true)
public class AdvertIDTO {
    private BigInteger[] advertIds;
}
