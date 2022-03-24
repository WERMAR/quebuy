package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.POI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface POIRepository extends JpaRepository<POI, BigInteger> {

    @Query(value = "SELECT *, ST_DISTANCE_SPHERE(poi.location, ST_GeomFromText(:point, 4326)) as distance_m\n" +
            "from qb.poi\n" +
            "having distance_m < :ratio\n" +
            "order by distance_m;", nativeQuery = true)
    List<POI> findByCurrentLocation(@Param("point")String pointQueryParam, @Param("ratio") int ratio);
}
