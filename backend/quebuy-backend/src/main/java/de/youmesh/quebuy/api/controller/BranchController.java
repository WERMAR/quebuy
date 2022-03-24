package de.youmesh.quebuy.api.controller;

import de.youmesh.quebuy.db.entity.Branch;
import de.youmesh.quebuy.service.BranchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/internal/branch")
@Slf4j
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @GetMapping
    @ResponseBody
    public List<String> getAllExistingBranches() {
        return this.branchService.getBranches().stream().map(Branch::getName).collect(Collectors.toList());
    }
}
