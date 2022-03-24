package de.youmesh.quebuy.service;

import de.youmesh.quebuy.api.data.OrganizationRestData;
import de.youmesh.quebuy.db.entity.Organization;
import de.youmesh.quebuy.util.converter.OrganizationRestConverter;
import de.youmesh.quebuy.db.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRestConverter converter;
    private final OrganizationRepository organizationRepository;
    private final OpeningHoursService openingHoursService;

    public OrganizationRestData createOrganization(OrganizationRestData data) {
        Organization organization = this.converter.toEntityObject(data);
        Organization savedOrganization = this.organizationRepository.save(organization);
        this.openingHoursService.saveOpeningHours(savedOrganization);
        return this.converter.toRestObject(savedOrganization);
    }

    public Organization getOrganizationForName(String organizationName) {
        return this.organizationRepository.findByOrganizationName(organizationName);
    }

    public List<OrganizationRestData> getOrganizations() {
        return this.organizationRepository.findAll().stream().map(converter::toRestObject).collect(Collectors.toList());
    }
}
