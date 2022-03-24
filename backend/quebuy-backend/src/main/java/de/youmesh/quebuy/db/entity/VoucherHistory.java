package de.youmesh.quebuy.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigInteger;

@Getter
@Setter
@ToString
@Entity
@Table(name = "voucher_history")
public class VoucherHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private BigInteger id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "organization")
    @ToString.Exclude
    private Organization organization;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "advert")
    @ToString.Exclude
    private Advert advert;

    @Column(name = "mail_check")
    private boolean mailCheck;
}
