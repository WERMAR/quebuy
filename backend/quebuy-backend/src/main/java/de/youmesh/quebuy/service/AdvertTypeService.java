package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.AdvertType;
import de.youmesh.quebuy.db.repository.AdvertTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdvertTypeService {

    private final AdvertTypeRepository repository;

    public AdvertType getAdvertTypeForName(String advertTypeName) {
        return this.repository.findByName(advertTypeName);
    }
}
