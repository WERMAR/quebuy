package de.youmesh.quebuy.db.entity;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Date;
import java.util.List;
import java.util.Objects;

/**
 * Entity Object contains a booked advertisement
 */
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Accessors(chain = true)
@Table(name = "advert")
public class Advert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "organization")
    private Organization organization;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(name = "long_description")
    private String longDescription;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "location")
    private Location location;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "advert_type")
    private AdvertType advertType;

    @Column(name = "delete_flag")
    private boolean deleted;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "advert_2_file", joinColumns = @JoinColumn(name = "advert"), inverseJoinColumns = @JoinColumn(name = "file"))
    @ToString.Exclude
    private List<File> files;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "poi_2_advert", joinColumns = @JoinColumn(name = "advert"), inverseJoinColumns = @JoinColumn(name = "poi"))
    @ToString.Exclude
    private List<POI> poiList;


    @ManyToMany(mappedBy = "adverts")
    @ToString.Exclude
    private List<User> users;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Advert advert = (Advert) o;
        return Objects.equals(id, advert.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
