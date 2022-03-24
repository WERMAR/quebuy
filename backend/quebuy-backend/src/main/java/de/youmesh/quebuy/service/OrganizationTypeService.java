package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.OrganizationType;
import de.youmesh.quebuy.db.repository.OrganizationTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrganizationTypeService {

    private final OrganizationTypeRepository repository;

    public OrganizationType getOrganizationTypeForName(String organizationTypeName) {
        OrganizationType organizationType = this.repository.findByName(organizationTypeName);
        if (organizationType != null) {
            log.debug("OrganizationType {{ " + organizationTypeName + " }} was founded");
        } else {
            organizationType = new OrganizationType();
            organizationType.setName(organizationTypeName);
        }
        return organizationType;
    }
}
