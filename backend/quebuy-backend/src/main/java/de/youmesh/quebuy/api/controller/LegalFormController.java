package de.youmesh.quebuy.api.controller;

import de.youmesh.quebuy.db.entity.LegalForm;
import de.youmesh.quebuy.service.LegalFormService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/internal/legalForm")
@Slf4j
@RequiredArgsConstructor
public class LegalFormController {

    private final LegalFormService legalFormService;

    @GetMapping
    @ResponseBody
    public List<String> getAllLegalForms() {
        return this.legalFormService.getAllLegalForms()
                .stream().map(LegalForm::getName).collect(Collectors.toList());
    }
}
