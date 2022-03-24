package de.youmesh.quebuy.util.constants;

public enum LegalFormEnum {

    EK("EK"),
    GmbH("GMBH"),
    AG("AG"),
    GbR("GBR"),
    OHG("OHG"),
    KG("KG"),
    GmbHCoKG("GMBHCOKG"),
    KGaA("KGAA"),
    GENOSSENSCHAFT("GENOSSENSCHAFT"),
    VVaG("VVAG"),
    Stiftung("STIFTUNG");

    LegalFormEnum(String name) {
        this.name = name;
    }

    String name;


    @Override
    public String toString() {
        return name;
    }
}
