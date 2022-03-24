package de.youmesh.quebuy.api.controller;

import de.youmesh.quebuy.api.data.AdvertRestData;
import de.youmesh.quebuy.api.data.mobile.AdvertIDTO;
import de.youmesh.quebuy.api.data.mobile.AdvertMobile;
import de.youmesh.quebuy.db.entity.Advert;
import de.youmesh.quebuy.service.AdvertService;
import de.youmesh.quebuy.util.converter.AdvertRestConverter;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/internal/advert")
@RequiredArgsConstructor
public class AdvertController {

    private final AdvertRestConverter advertRestConverter;
    private final AdvertService advertService;

    @PostMapping("/create")
    @ResponseBody()
    public AdvertRestData create(@RequestBody AdvertRestData advertRestData) {
        AdvertRestData advert = this.advertService.createAdvert(advertRestData);
        if (advert != null) {
            return advert;
        }
        throw new NullPointerException("Advert could not create by the system");
    }

    @PostMapping("/forIds")
    @ResponseBody()
    public List<AdvertMobile> getForIDs(@RequestBody AdvertIDTO advertIDs) throws NotFoundException {
        List<Advert> adverts = this.advertService.getForID(advertIDs);
        if (adverts != null)
            return adverts.stream().map(advertRestConverter::toMobileRest).collect(Collectors.toList());
        throw new NotFoundException("No Adverts could not found for the IDs");
    }
}
