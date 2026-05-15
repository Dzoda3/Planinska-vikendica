package com.example.demo.modeli;

import java.time.LocalDateTime;

public class Rezervacija {
    private int idR;
    private int idV;
    private String korisnicko_ime;
    private LocalDateTime datumOd;
    private LocalDateTime datumDo;
    private int odrasli;
    private int deca;
    private LocalDateTime rezervisan;
    
    public Rezervacija(int idR, int idV, String korisnicko_ime, LocalDateTime datumOd, LocalDateTime datumDo, int odrasli, int deca, LocalDateTime rezervisan) {
        this.idR = idR;
        this.idV = idV;
        this.korisnicko_ime = korisnicko_ime;
        this.datumOd = datumOd;
        this.datumDo = datumDo;
        this.odrasli = odrasli;
        this.deca = deca;
        this.rezervisan = rezervisan;
    }

    public int getIdR() {
        return idR;
    }

    public void setIdR(int idR) {
        this.idR = idR;
    }

    public int getIdV() {
        return idV;
    }

    public void setIdV(int idV) {
        this.idV = idV;
    }

    public String getKorisnicko_ime() {
        return korisnicko_ime;
    }

    public void setKorisnicko_ime(String korisnicko_ime) {
        this.korisnicko_ime = korisnicko_ime;
    }

    public LocalDateTime getDatumOd() {
        return datumOd;
    }

    public void setDatumOd(LocalDateTime datumOd) {
        this.datumOd = datumOd;
    }

    public LocalDateTime getDatumDo() {
        return datumDo;
    }

    public void setDatumDo(LocalDateTime datumDo) {
        this.datumDo = datumDo;
    }

    public int getOdrasli() {
        return odrasli;
    }

    public void setOdrasli(int odrasli) {
        this.odrasli = odrasli;
    }

    public int getDeca() {
        return deca;
    }

    public void setDeca(int deca) {
        this.deca = deca;
    }

    public LocalDateTime getRezervisan() {
        return rezervisan;
    }

    public void setRezervisan(LocalDateTime rezervisan) {
        this.rezervisan = rezervisan;
    }    
}
