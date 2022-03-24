package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.db.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BranchRepository extends JpaRepository<Branch, Integer> {

    Branch findByName(String name);
}
