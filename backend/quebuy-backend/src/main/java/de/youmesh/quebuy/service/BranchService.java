package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.Branch;
import de.youmesh.quebuy.db.repository.BranchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;

    public Branch getBranchForName(String branchName) {
        Branch branch = this.branchRepository.findByName(branchName);
        if (branch != null) {
            log.debug("Branch {{ " + branchName + " }} was founded");
        } else {
            branch = new Branch();
            branch.setName(branchName);
        }
        return branch;
    }

    public List<Branch> getBranches() {
        return this.branchRepository.findAll();
    }
}
