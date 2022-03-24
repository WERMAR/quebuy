package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.LegalForm;
import de.youmesh.quebuy.db.repository.LegalFormRepository;
import de.youmesh.quebuy.util.constants.LegalFormEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.util.EnumUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class LegalFormService {

    private final LegalFormRepository repository;

    public LegalForm getLegalFormForName(String name) {
        LegalFormEnum legalFormEnum = checkForLegalFormEnum(name);
        LegalForm legalForm = this.repository.findLegalFormByName(legalFormEnum.name());
        if (legalForm != null) {
            log.debug("LegalForm {{ " + legalFormEnum.name() + " }} was founded");
        } else {
            log.debug("LegalForm {{ " + legalFormEnum.name() + " }} is not stored and will be created now");
            legalForm = new LegalForm();
            legalForm.setName(legalFormEnum.name());
        }
        return legalForm;
    }

    private LegalFormEnum checkForLegalFormEnum(String name) {
        return EnumUtils.findEnumInsensitiveCase(LegalFormEnum.class, name);
    }

    public List<LegalForm> getAllLegalForms() {
        return this.repository.findAll();
    }
}
