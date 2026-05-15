package com.example.demo.modeli;

public class Ocena {
    private double ocena;
    private int idV;
    private String korisnicko_ime;
    
    public Ocena(double ocena, int idV, String korisnicko_ime) {
        this.ocena = ocena;
        this.idV = idV;
        this.korisnicko_ime = korisnicko_ime;
    }

    public double getOcena() {
        return ocena;
    }

    public void setOcena(double ocena) {
        this.ocena = ocena;
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
}
