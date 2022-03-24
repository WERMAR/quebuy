package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class OpeningHoursRestData {

    private String weekday;
    private Long startTime;
    private Long endTime;
    private boolean closed;
}
