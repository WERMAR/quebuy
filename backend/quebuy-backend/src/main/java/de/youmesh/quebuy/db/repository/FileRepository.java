package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface FileRepository extends JpaRepository<File, BigInteger> {

    public File findByFileName(String fileName);
}
