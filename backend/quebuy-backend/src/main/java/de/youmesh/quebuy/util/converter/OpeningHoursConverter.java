package de.youmesh.quebuy.util.converter;

import de.youmesh.quebuy.api.data.OpeningHoursRestData;
import de.youmesh.quebuy.conf.annotations.Util;
import de.youmesh.quebuy.db.entity.OpeningHours;
import de.youmesh.quebuy.util.constants.WeekDaysEnum;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Util
@RequiredArgsConstructor
public class OpeningHoursConverter implements RestConverter<OpeningHours, OpeningHoursRestData> {

    @Override
    public OpeningHours toEntityObject(OpeningHoursRestData data) {
        return new OpeningHours()
                .setWeekDay(Objects.requireNonNull(WeekDaysEnum.findEnumForTecName(data.getWeekday())).getTecName())
                .setOpenTime(LocalDateTime.ofInstant(Instant.ofEpochMilli(data.getStartTime()), ZoneId.systemDefault()))
                .setCloseTime(LocalDateTime.ofInstant(Instant.ofEpochMilli(data.getEndTime()), ZoneId.systemDefault()));
    }

    @Override
    public OpeningHoursRestData toRestObject(OpeningHours data) {
        return new OpeningHoursRestData()
                .setClosed(data.isClosed())
                .setStartTime(data.getOpenTime().toInstant(ZoneOffset.UTC).toEpochMilli())
                .setEndTime(data.getCloseTime().toInstant(ZoneOffset.UTC).toEpochMilli())
                .setWeekday(data.getWeekDay());
    }

    public List<OpeningHours> getOpeningHours(List<OpeningHoursRestData> openingHoursData) {
        return openingHoursData.stream().map(this::toEntityObject).collect(Collectors.toList());
    }

    public List<OpeningHoursRestData> getOpeningHoursRest(List<OpeningHours> openingHoursList) {
        return openingHoursList.stream().map(this::toRestObject).collect(Collectors.toList());
    }
}
