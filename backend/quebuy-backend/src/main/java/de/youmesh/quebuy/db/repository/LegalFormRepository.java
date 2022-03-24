package de.youmesh.quebuy.db.repository;

import de.youmesh.quebuy.util.constants.LegalFormEnum;
import de.youmesh.quebuy.db.entity.LegalForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LegalFormRepository extends JpaRepository<LegalForm, Integer> {

    /**
     * returns the correct {@link LegalForm}-DB-Object when for the passed
     * legalFormName a {@link LegalForm} Object will be founded
     * <p>
     * The legalFormName is based on following Enum {@link LegalFormEnum}. The name property is used for the entity-object-name.
     *
     * @param legalFormName - passed name for searched LegalForm based on {@link LegalFormEnum}
     * @return founded {@link LegalForm} or null
     */
    LegalForm findLegalFormByName(String legalFormName);
}
