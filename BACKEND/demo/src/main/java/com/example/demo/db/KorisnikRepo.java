package com.example.demo.db;

import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.modeli.Koder;
import com.example.demo.modeli.Korisnik;
import com.example.demo.modeli.Poruka;
import com.example.demo.modeli.Rezervacija;


public class KorisnikRepo {
    public Korisnik prijava(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement(
                        "select * from korisnici where korisnicko_ime = ? AND Tip = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());
            upit.setString(2, korisnik.getTip());

            ResultSet rs = upit.executeQuery();
            if(rs.next()) {
                if(!Koder.verifikujSifru(korisnik.getLozinka(), rs.getString("lozinka"))) {
                    return null;
                }

                String slika = new String(rs.getBytes("Slika"), StandardCharsets.UTF_8);
                return new Korisnik(
                    rs.getString("korisnicko_ime"),
                    korisnik.getLozinka(),
                    rs.getString("Ime"),
                    rs.getString("Prezime"),
                    rs.getString("Tip"),
                    rs.getString("Pol"),
                    rs.getString("Adresa"),
                    rs.getString("Telefon"),
                    rs.getString("Mejl"),
                    slika,
                    rs.getString("Kartica"),
                    rs.getInt("Deaktiviran")  
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public Poruka registracija(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement(
                        "SELECT * FROM Korisnici WHERE korisnicko_ime = ? OR mejl = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());
            upit.setString(2, korisnik.getMejl());

            PreparedStatement upit2 = conn.prepareStatement("SELECT * FROM Registracije WHERE korisnicko_ime = ? OR mejl = ?");
            upit2.setString(1, korisnik.getKorisnicko_ime());
            upit2.setString(2, korisnik.getMejl());

            ResultSet rs = upit.executeQuery();
            ResultSet rs2 = upit2.executeQuery();
            if(rs.next()) {
                return new Poruka("P");
            } else if(rs2.next()) {
                return new Poruka("RP");
            } else {
                PreparedStatement stmt = conn.prepareStatement("INSERT INTO Registracije VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
                String hes = Koder.sifruj(korisnik.getLozinka());

                stmt.setString(1, korisnik.getKorisnicko_ime());
                stmt.setString(2, hes);
                stmt.setString(3, korisnik.getIme());
                stmt.setString(4, korisnik.getPrezime());
                stmt.setString(5, korisnik.getTip());
                stmt.setString(6, korisnik.getPol());
                stmt.setString(7, korisnik.getAdresa());
                stmt.setString(8, korisnik.getTelefon());
                stmt.setString(9, korisnik.getMejl());
                stmt.setBytes(10, korisnik.getSlika().getBytes());
                stmt.setString(11, korisnik.getKartica());

                if(stmt.executeUpdate() > 0) {
                    return new Poruka("U");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }
    
    public Poruka promenaLozinke(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement(
                        "UPDATE korisnici SET lozinka = ? WHERE korisnicko_ime = ?")) {

            String hes = Koder.sifruj(korisnik.getLozinka());

            upit.setString(1, hes);
            upit.setString(2, korisnik.getKorisnicko_ime());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public int brojVlasnika() {
        int brojVlasnika = 0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Korisnici WHERE Tip = 'vlasnik'")) {

            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                brojVlasnika++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return brojVlasnika;
    }

    public int brojTurista() {
        int brojTurista = 0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Korisnici WHERE Tip = 'turista'")) {

            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                brojTurista++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return brojTurista;
    }

    public Poruka azuriraj(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM korisnici WHERE mejl = ?")) {

            upit.setString(1, korisnik.getMejl());
            ResultSet rs = upit.executeQuery();
            if(rs.next()) {
                return new Poruka("N");
            }

            PreparedStatement upit2 = conn.prepareStatement("SELECT * FROM Registracije WHERE mejl = ?");
            upit2.setString(1, korisnik.getMejl());
            ResultSet rs2 = upit2.executeQuery();
            if(rs2.next()) {
                return new Poruka("N");
            }

            PreparedStatement upit3 = conn.prepareStatement("UPDATE korisnici SET ime = ?, prezime = ?, adresa = ?, telefon = ?, mejl = ?, slika = ?, kartica = ? WHERE korisnicko_ime = ?");
            upit3.setString(1, korisnik.getIme());
            upit3.setString(2, korisnik.getPrezime());
            upit3.setString(3, korisnik.getAdresa());
            upit3.setString(4, korisnik.getTelefon());
            upit3.setString(5, korisnik.getMejl());
            upit3.setBytes(6, korisnik.getSlika().getBytes());
            upit3.setString(7, korisnik.getKartica());
            upit3.setString(8, korisnik.getKorisnicko_ime());

            if(upit3.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public List<Rezervacija> dohvatiRezervacije(Korisnik korisnik) {
        List<Rezervacija> lista = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement("select * from rezervacije WHERE korisnicko_ime = ? AND status = 'P'")) {

            stmt.setString(1, korisnik.getKorisnicko_ime());

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Rezervacija r = new Rezervacija(
                    rs.getInt("IdR"),
                    rs.getInt("IdV"),
                    rs.getString("korisnicko_ime"),
                    rs.getObject("datumOd", LocalDateTime.class),
                    rs.getObject("datumDo", LocalDateTime.class),
                    rs.getInt("odrasli"),
                    rs.getInt("deca"),
                    rs.getObject("rezervisan", LocalDateTime.class)
                );

                lista.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public List<Korisnik> dohvatiSve() {
        List<Korisnik> lista = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement("select * from korisnici WHERE Tip != 'admin'")) {

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                String slika = new String(rs.getBytes("Slika"), StandardCharsets.UTF_8);

                Korisnik k = new Korisnik(
                        rs.getString("korisnicko_ime"),
                        rs.getString("lozinka"),
                        rs.getString("Ime"),
                        rs.getString("Prezime"),
                        rs.getString("Tip"),
                        rs.getString("Pol"),
                        rs.getString("Adresa"),
                        rs.getString("Telefon"),
                        rs.getString("Mejl"),
                        slika,
                        rs.getString("Kartica"),
                        rs.getInt("Deaktiviran")
                    );
                lista.add(k);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public Poruka deaktiviraj(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("UPDATE korisnici SET Deaktiviran = abs(Deaktiviran - 1) WHERE korisnicko_ime = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public List<Korisnik> dohvatiRegistracije() {
        List<Korisnik> lista = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement("select * from registracije WHERE Odbijen = 0")) {

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                String slika = new String(rs.getBytes("Slika"), StandardCharsets.UTF_8);

                Korisnik k = new Korisnik(
                        rs.getString("korisnicko_ime"),
                        rs.getString("lozinka"),
                        rs.getString("Ime"),
                        rs.getString("Prezime"),
                        rs.getString("Tip"),
                        rs.getString("Pol"),
                        rs.getString("Adresa"),
                        rs.getString("Telefon"),
                        rs.getString("Mejl"),
                        slika,
                        rs.getString("Kartica"),
                        0
                    );
                lista.add(k);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public Poruka prihvati(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement(
                        "SELECT * FROM Registracije WHERE korisnicko_ime = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());

            ResultSet rs = upit.executeQuery();
            if(rs.next()) {
                PreparedStatement upit2 = conn.prepareStatement("INSERT INTO korisnici VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
                upit2.setString(1, rs.getString("korisnicko_ime"));
                upit2.setString(2, rs.getString("lozinka"));
                upit2.setString(3, rs.getString("Ime"));
                upit2.setString(4, rs.getString("Prezime"));
                upit2.setString(5, rs.getString("Tip"));
                upit2.setString(6, rs.getString("Pol"));
                upit2.setString(7, rs.getString("Adresa"));
                upit2.setString(8, rs.getString("Telefon"));
                upit2.setString(9, rs.getString("Mejl"));
                upit2.setString(10, rs.getString("Slika"));
                upit2.setString(11, rs.getString("Kartica"));

                if(upit2.executeUpdate() > 0) {
                   PreparedStatement upit3 = conn.prepareStatement("DELETE FROM registracije WHERE korisnicko_ime = ?");
                   upit3.setString(1, korisnik.getKorisnicko_ime());
                   if(upit3.executeUpdate() > 0) {
                    return new Poruka("U");
                   }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka odbij(Korisnik korisnik) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement(
                        "UPDATE registracije SET Odbijen = 1 WHERE korisnicko_ime = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka adminAzuriraj(Korisnik korisnik, String korisnicko_ime) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM korisnici WHERE korisnicko_ime = ? OR mejl = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());
            upit.setString(2, korisnik.getMejl());
            ResultSet rs = upit.executeQuery();
            if(rs.next()) {
                return new Poruka("N");
            }

            PreparedStatement upit2 = conn.prepareStatement("SELECT * FROM Registracije WHERE korisnicko_ime = ? OR mejl = ?");
            upit2.setString(1, korisnik.getKorisnicko_ime());
            upit2.setString(2, korisnik.getMejl());
            ResultSet rs2 = upit2.executeQuery();
            if(rs2.next()) {
                return new Poruka("N");
            }

            PreparedStatement upit3 = conn.prepareStatement("UPDATE korisnici SET korisnicko_ime = ?, lozinka = ?, ime = ?, prezime = ?, tip = ?, pol = ?, adresa = ?, telefon = ?, mejl = ?, slika = ?, kartica = ? WHERE korisnicko_ime = ?");
            upit3.setString(1, korisnik.getKorisnicko_ime());
            upit3.setString(2, korisnik.getLozinka());
            upit3.setString(3, korisnik.getIme());
            upit3.setString(4, korisnik.getPrezime());
            upit3.setString(5, korisnik.getTip());
            upit3.setString(6, korisnik.getPol());
            upit3.setString(7, korisnik.getAdresa());
            upit3.setString(8, korisnik.getTelefon());
            upit3.setString(9, korisnik.getMejl());
            upit3.setBytes(10, korisnik.getSlika().getBytes());
            upit3.setString(11, korisnik.getKartica());
            upit3.setString(12, korisnicko_ime);

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }
}