package de.youmesh.quebuy.db.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.math.BigInteger;
import java.sql.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "mail")
    private String mail;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "gender", referencedColumnName = "id")
    private Gender gender;

    @Column(name = "birthdate")
    private Date birthdate;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "location", referencedColumnName = "id")
    private Location location;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_role")
    private UserRole userRole;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "organization")
    private Organization organization;

    @Column(name = "organization_admin")
    private boolean organizationAdmin;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "user_2_advert", joinColumns = @JoinColumn(name = "user"), inverseJoinColumns = @JoinColumn(name = "advert"))
    @ToString.Exclude
    private List<Advert> adverts;

    public User() {

    }

    public User(BigInteger id, String username, String password, String firstname, String lastname, String mail, Date birthdate, Location location, UserRole userRole, Organization organization, boolean organizationAdmin) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.birthdate = birthdate;
        this.location = location;
        this.userRole = userRole;
        this.organization = organization;
        this.organizationAdmin = organizationAdmin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return 0;
    }
}