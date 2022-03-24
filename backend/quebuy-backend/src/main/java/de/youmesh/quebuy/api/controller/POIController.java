package de.youmesh.quebuy.api.controller;

import de.youmesh.quebuy.api.data.LocationRequestData;
import de.youmesh.quebuy.api.data.POIRestData;
import de.youmesh.quebuy.service.POIService;
import de.youmesh.quebuy.util.converter.POIRestConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/internal/poi")
@RequiredArgsConstructor
public class POIController {

    private final POIService poiService;
    private final POIRestConverter poiRestConverter;


    @GetMapping("/all")
    @ResponseBody
    public List<POIRestData> getAll() {
        return poiRestConverter.toRestDataList(this.poiService.getAllPOIs());
    }

    @PostMapping("/currentLocation")
    @ResponseBody
    public List<POIRestData> getForCurrentLocation(@RequestBody LocationRequestData data) {
        return poiRestConverter.toRestDataList(this.poiService.getForCurrentLocation(data));
    }
}
