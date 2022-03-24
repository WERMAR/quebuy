package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.OrganizationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationTypeRepository extends JpaRepository<OrganizationType, Integer> {

    OrganizationType findByName(String name);
}
