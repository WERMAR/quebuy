package de.youmesh.quebuy.service;

import de.youmesh.quebuy.api.data.AdvertRestData;
import de.youmesh.quebuy.api.data.mobile.AdvertIDTO;
import de.youmesh.quebuy.util.converter.AdvertRestConverter;
import de.youmesh.quebuy.db.entity.Advert;
import de.youmesh.quebuy.db.repository.AdvertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdvertService {

    private final AdvertRepository advertRepository;
    private final UserService userService;
    private final AdvertRestConverter converter;

    public AdvertRestData createAdvert(AdvertRestData data) {
        Advert advert = this.converter.toEntityObject(data);
        return this.converter.toRestObject(this.advertRepository.save(advert));
    }

    public List<Advert> getForID(AdvertIDTO advertIDs) {
        return this.advertRepository.findByIdIsIn(Arrays.asList(advertIDs.getAdvertIds()));
    }
}
