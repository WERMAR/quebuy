package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.Advert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;

public interface AdvertRepository extends JpaRepository<Advert, BigInteger> {

    List<Advert> findByIdIsIn(Collection<BigInteger> id);
}
