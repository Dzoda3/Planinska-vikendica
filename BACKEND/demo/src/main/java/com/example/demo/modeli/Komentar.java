package com.example.demo.modeli;

public class Komentar {
    private String komentar;
    private int idV;
    private String korisnicko_ime;
    
    public Komentar(String komentar, int idV, String korisnicko_ime) {
        this.komentar = komentar;
        this.idV = idV;
        this.korisnicko_ime = korisnicko_ime;
    }

    public String getKomentar() {
        return komentar;
    }

    public void setKomenar(String komentar) {
        this.komentar = komentar;
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
