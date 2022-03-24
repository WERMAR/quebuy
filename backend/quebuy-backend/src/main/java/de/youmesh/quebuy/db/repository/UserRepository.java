package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface UserRepository extends JpaRepository<User, BigInteger> {

    public User findByUsername(String username);
}
