package com.example.demo.modeli;

public class Korisnik {
    private String korisnicko_ime;
    private String lozinka;
    private String ime;
    private String prezime;
    private String tip;
    private String pol;
    private String adresa;
    private String telefon;
    private String mejl;
    private String slika;
    private String kartica;
    private int deaktiviran;

    public Korisnik(String korisnicko_ime, String lozinka, String ime, String prezime, String tip, String pol, String adresa, String telefon, String mejl, String slika, String kartica, int deaktiviran) {
        this.korisnicko_ime = korisnicko_ime;
        this.lozinka = lozinka;
        this.ime = ime;
        this.prezime = prezime;
        this.tip = tip;
        this.pol = pol;
        this.adresa = adresa;
        this.telefon = telefon;
        this.mejl = mejl;
        this.slika = slika;
        this.kartica = kartica;
        this.deaktiviran = deaktiviran;
    }

    public String getKorisnicko_ime() {
        return korisnicko_ime;
    }

    public void setKorisnicko_ime(String korisnicko_ime) {
        this.korisnicko_ime = korisnicko_ime;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public String getPol() {
        return pol;
    }

    public void setPol(String pol) {
        this.pol = pol;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getMejl() {
        return mejl;
    }

    public void setMejl(String mejl) {
        this.mejl = mejl;
    }

    public String getSlika() {
        return slika;
    }

    public void setSlika(String slika) {
        this.slika = slika;
    }

    public String getKartica() {
        return kartica;
    }

    public void setKartica(String kartica) {
        this.kartica = kartica;
    }

    public int getDeaktiviran() {
        return deaktiviran;
    }

    public void setDeaktiviran(int deaktiviran) {
        this.deaktiviran = deaktiviran;
    }
}
