package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigInteger;

@Getter
@Setter
@Accessors(chain = true)
public class POIRestData {
    public double longitude;
    public double latitude;
    public String name;
    public boolean hotspot;
    public BigInteger[] adverts;
}
