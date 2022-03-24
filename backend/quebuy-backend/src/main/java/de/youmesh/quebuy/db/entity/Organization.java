package de.youmesh.quebuy.db.entity;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "organization")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "organization_name")
    private String organizationName;

    @Column(name = "telephone_number")
    private String telephoneNumber;

    @Column(name = "mail")
    private String mail;

    @Column(name = "ust_id")
    private String ustId;

    @Column(name = "commercial_register_number")
    private String commercialRegisterNumber;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "trade_licence", referencedColumnName = "id")
    private File tradeLicence;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "branch")
    private Branch branch;

    @Column(name = "custom_question")
    private String customQuestion;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "location", referencedColumnName = "id")
    private Location location;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_type")
    private OrganizationType organizationType;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "legal_form")
    private LegalForm legalForm;

    @OneToMany(mappedBy = "organization")
    @ToString.Exclude
    private List<Advert> adverts;

    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "logo", referencedColumnName = "id")
    private File logo;

    @OneToMany(mappedBy = "organization")
    private List<OpeningHours> openingHoursList;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Organization that = (Organization) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
