package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.OpeningHours;
import de.youmesh.quebuy.db.entity.Organization;
import de.youmesh.quebuy.db.repository.OpeningHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OpeningHoursService {

    private final OpeningHoursRepository repository;

    public void saveOpeningHours(Organization savedOrganization) {
        List<OpeningHours> openingHoursList = savedOrganization.getOpeningHoursList();
        for (OpeningHours openingHours : openingHoursList) {
            openingHours.setOrganization(savedOrganization);
        }
        this.repository.saveAll(openingHoursList);
    }
}
