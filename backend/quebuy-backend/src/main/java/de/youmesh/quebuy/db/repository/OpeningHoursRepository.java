package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.OpeningHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface OpeningHoursRepository extends JpaRepository<OpeningHours, BigInteger> {
}
