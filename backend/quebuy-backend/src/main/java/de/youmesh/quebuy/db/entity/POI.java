package de.youmesh.quebuy.db.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "poi")
public class POI {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "location")
    private Point location;

    @Column(name = "name")
    private String name;

    @Column(name = "hotspot")
    private boolean hotspot;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "poi_2_advert", joinColumns = @JoinColumn(name = "poi"), inverseJoinColumns = @JoinColumn(name = "advert"))
    @ToString.Exclude
    private List<Advert> adverts;
}
