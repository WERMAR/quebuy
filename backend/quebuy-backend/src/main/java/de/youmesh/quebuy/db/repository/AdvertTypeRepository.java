package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.AdvertType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface AdvertTypeRepository extends JpaRepository<AdvertType, BigInteger> {

    AdvertType findByName(String advertTypeName);
}
