package de.youmesh.quebuy.util.constants;

public enum WeekDaysEnum {

    MONDAY("MO", "Monday", "Montag"),
    TUESDAY("TU", "Tuesday", "Dienstag"),
    WEDNESDAY("WE", "Wednesday", "Mittwoch"),
    THURSDAY("TH", "Thursday", "Donnerstag"),
    FRIDAY("FR", "Friday", "Freitag"),
    SATURDAY("SA", "Saturday", "Samstag"),
    SUNDAY("SU", "Sunday", "Sonntag");


    public static WeekDaysEnum findEnumForTecName(String tecName) {
        switch (tecName) {
            case "MO": {
                return MONDAY;
            }
            case "TU": {
                return TUESDAY;
            }
            case "WE": {
                return WEDNESDAY;
            }
            case "TH": {
                return THURSDAY;
            }
            case "FR": {
                return FRIDAY;
            }
            case "SA": {
                return SATURDAY;
            }
            case "SU": {
                return SUNDAY;
            }
        }
        return null;
    }

    private String tecName;
    private String nameEN;
    private String nameDE;

    WeekDaysEnum(String tecName, String nameEN, String nameDE) {
        this.tecName = tecName;
        this.nameEN = nameEN;
        this.nameDE = nameDE;
    }

    public String getDE() {
        return this.nameDE;
    }

    public String getEN() {
        return this.nameEN;
    }

    public String getTecName() {
        return this.tecName;
    }

}
