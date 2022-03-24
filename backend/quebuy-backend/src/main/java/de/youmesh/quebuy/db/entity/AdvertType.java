package de.youmesh.quebuy.db.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigInteger;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "advert_type")
public class AdvertType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "name")
    private String name;
}
