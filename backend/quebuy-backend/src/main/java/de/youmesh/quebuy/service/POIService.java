package de.youmesh.quebuy.service;

import de.youmesh.quebuy.api.data.LocationRequestData;
import de.youmesh.quebuy.db.entity.POI;
import de.youmesh.quebuy.db.repository.POIRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class POIService {

    private final POIRepository poiRepository;

    public List<POI> getAllPOIs() {
        return this.poiRepository.findAll();
    }

    public List<POI> getForCurrentLocation(LocationRequestData data) {
        return this.poiRepository.findByCurrentLocation("POINT(" + data.getLongitude() + " " + data.getLatitude() + ")", data.getRatio());
    }
}
