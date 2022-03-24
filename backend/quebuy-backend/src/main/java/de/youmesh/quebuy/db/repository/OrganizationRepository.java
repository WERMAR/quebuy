package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface OrganizationRepository extends JpaRepository<Organization, BigInteger> {

    Organization findByOrganizationName(String organizationName);
}