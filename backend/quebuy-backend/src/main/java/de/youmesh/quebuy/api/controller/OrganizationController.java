package de.youmesh.quebuy.api.controller;

import de.youmesh.quebuy.api.data.OrganizationRestData;
import de.youmesh.quebuy.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/internal/organization")
@Slf4j
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService service;

    @GetMapping()
    @ResponseBody()
    public String getOrganization() {
        log.info("Get organization");
        return "Hello World";
    }

    @PostMapping("/create")
    @ResponseBody()
    public OrganizationRestData createOrganization(@RequestBody OrganizationRestData organizationRestData) {
        log.info(organizationRestData.getOrganizationName());
        OrganizationRestData organization = this.service.createOrganization(organizationRestData);
        if (organization != null) {
            return organization;
        }
        throw new NullPointerException("Organization is null - Internal Error while creating the organization");
    }

    @PutMapping("/update")
    @ResponseBody()
    public OrganizationRestData updateOrganization(@RequestBody OrganizationRestData organizationRestData) {
        return null;
    }

    @GetMapping("/all")
    @ResponseBody
    public List<OrganizationRestData> getAllOrganizations() {
        return this.service.getOrganizations();
    }
}
