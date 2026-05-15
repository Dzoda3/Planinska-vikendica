package com.example.demo.modeli;

public class Vikendica {
    private int idV;
    private String naziv;
    private String mesto;
    private String usluge;
    private int letnjaCena;
    private int zimskaCena;
    private String telefon;
    
    public Vikendica(int idV, String naziv, String mesto, String usluge, int letnjaCena, int zimskaCena, String telefon) {
        this.idV = idV;
        this.naziv = naziv;
        this.mesto = mesto;
        this.usluge = usluge;
        this.letnjaCena = letnjaCena;
        this.zimskaCena = zimskaCena;
        this.telefon = telefon;
    }

    public int getidV() {
        return idV;
    }

    public void setidV(int idV) {
        this.idV = idV;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getMesto() {
        return mesto;
    }

    public void setMesto(String mesto) {
        this.mesto = mesto;
    }

    public String getUsluge() {
        return usluge;
    }

    public void setUsluge(String usluge) {
        this.usluge = usluge;
    }

    public int getLetnjaCena() {
        return letnjaCena;
    }

    public void setLetnjaCena(int cenovnik) {
        this.letnjaCena = cenovnik;
    }

    public int getZimskaCena() {
        return zimskaCena;
    }

    public void setZimskaCena(int zimskaCena) {
        this.zimskaCena = zimskaCena;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
}