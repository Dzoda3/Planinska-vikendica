package com.example.demo.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.modeli.Komentar;
import com.example.demo.modeli.Korisnik;
import com.example.demo.modeli.Ocena;
import com.example.demo.modeli.Poruka;
import com.example.demo.modeli.Rezervacija;
import com.example.demo.modeli.Vikendica;

public class VikendicaRepo {
    public List<Vikendica> dohvatiSve() {
        List<Vikendica> lista = new ArrayList<>();

        try (Connection conn = DB.source().getConnection();
                PreparedStatement stmt = conn.prepareStatement("select * from vikendice")) {

            ResultSet rs = stmt.executeQuery();
            while(rs.next()) {
                Vikendica v = new Vikendica(
                    rs.getInt("IdV"),
                    rs.getString("Naziv"),
                    rs.getString("Mesto"),
                    rs.getString("Usluge"),
                    rs.getInt("Letnja_cena"),
                    rs.getInt("Zimska_cena"),
                    rs.getString("Telefon")
                );

                lista.add(v);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public List<Vikendica> filtriraj(Vikendica vikendica) {
        List<Vikendica> lista = new ArrayList<>();

        try (Connection conn = DB.source().getConnection()) {

            String naziv = vikendica.getNaziv();
            String mesto = vikendica.getMesto();
            
            PreparedStatement upit;
            if(naziv != "" && mesto != "") {
                upit = conn.prepareStatement("SELECT * FROM vikendice WHERE Naziv LIKE ? AND Mesto LIKE ?");
                upit.setString(1, naziv + "%");
                upit.setString(2, mesto + "%");
            } else if(naziv == "" && mesto != "") {
                upit = conn.prepareStatement("SELECT * FROM vikendice WHERE Mesto LIKE ?");                
                upit.setString(1, mesto + "%");
            } else if(naziv != "" && mesto == "") {
                upit = conn.prepareStatement("SELECT * FROM vikendice WHERE Naziv LIKE ?");
                upit.setString(1, naziv + "%");
            } else {
                return dohvatiSve();
            }

            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                Vikendica v = new Vikendica(
                    rs.getInt("IdV"),
                    rs.getString("Naziv"),
                    rs.getString("Mesto"),
                    rs.getString("Usluge"),
                    rs.getInt("Letnja_cena"),
                    rs.getInt("Zimska_cena"),
                    rs.getString("Telefon")
                );

                lista.add(v);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public int brojVikendica() {
        int brojVikendica = 0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Vikendice")) {

            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                brojVikendica++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return brojVikendica;
    }

    public Vikendica dohvatiVikendicu(Vikendica vikendica) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM vikendice WHERE IdV = ?")) {

            upit.setInt(1, vikendica.getidV());

            ResultSet rs = upit.executeQuery();
            if(rs.next()) {
                return new Vikendica(
                    rs.getInt("IdV"),
                    rs.getString("Naziv"),
                    rs.getString("Mesto"),
                    rs.getString("Usluge"),
                    rs.getInt("Letnja_cena"),
                    rs.getInt("Zimska_cena"),
                    rs.getString("Telefon")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Vikendica> dohvatiMoje(Korisnik korisnik) {
        List<Vikendica> lista = new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM vikendice WHERE korisnicko_ime = ?")) {

            upit.setString(1, korisnik.getKorisnicko_ime());

            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                Vikendica v = new Vikendica(
                    rs.getInt("IdV"),
                    rs.getString("Naziv"),
                    rs.getString("Mesto"),
                    rs.getString("Usluge"),
                    rs.getInt("Letnja_cena"),
                    rs.getInt("Zimska_cena"),
                    rs.getString("Telefon")
                );

                lista.add(v);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public Poruka azuriraj(Vikendica vikendica) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("UPDATE vikendice SET naziv = ?, mesto = ?, usluge = ?, Letnja_cena = ?, Zimska_cena = ?, telefon = ? WHERE IdV = ?")) {

            upit.setString(1, vikendica.getNaziv());
            upit.setString(2, vikendica.getMesto());
            upit.setString(3, vikendica.getUsluge());
            upit.setInt(4, vikendica.getLetnjaCena());
            upit.setInt(5, vikendica.getZimskaCena());
            upit.setString(6, vikendica.getTelefon());
            upit.setInt(7, vikendica.getidV());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka obrisi(Vikendica vikendica) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("DELETE FROM vikendice WHERE IdV = ?")) {

            upit.setInt(1, vikendica.getidV());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka dodaj(Vikendica vikendica, String korisnicko_ime) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("INSERT INTO Vikendice VALUES(0, ?, ?, ?, ?, ?, ?, ?)")) {

            upit.setString(1, vikendica.getNaziv());
            upit.setString(2, vikendica.getMesto());
            upit.setString(3, vikendica.getUsluge());
            upit.setInt(4, vikendica.getLetnjaCena());
            upit.setInt(5, vikendica.getZimskaCena());
            upit.setString(6, vikendica.getTelefon());
            upit.setString(7, korisnicko_ime);

            if(upit.executeUpdate() > 0) {
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
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM rezervacije JOIN vikendice USING(IdV) WHERE vikendice.korisnicko_ime = ? AND status = 'C'")) {

            upit.setString(1, korisnik.getKorisnicko_ime());

            ResultSet rs = upit.executeQuery();
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

    public Poruka potvrdi(Rezervacija rezervacija) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("UPDATE Rezervacije SET status = 'P' WHERE IdR = ?")) {

            upit.setInt(1, rezervacija.getIdR());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka odbij(int idR, String komentar) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("UPDATE Rezervacije SET status = 'O', komentar = ? WHERE IdR = ?")) {

            System.out.println(komentar);
            upit.setString(1, komentar);
            upit.setInt(2, idR);

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka otkazi(Rezervacija rezervacija) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("DELETE FROM Rezervacije WHERE IdR = ?")) {

            upit.setInt(1, rezervacija.getIdR());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public List<String> dohvatiSlike(Vikendica vikendica) {
        List<String> lista = new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM slike WHERE IdV = ?")) {

            upit.setInt(1, vikendica.getidV());
            
            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                String s = rs.getString("Slika");
                lista.add(s);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public List<Ocena> dohvatiOcene(Vikendica vikendica) {
        List<Ocena> lista = new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM ocene WHERE IdV = ?")) {

            upit.setInt(1, vikendica.getidV());
            
            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                Ocena o = new Ocena(
                    rs.getDouble("Ocena"),
                    rs.getInt("IdV"),
                    rs.getString("korisnicko_ime")
                );

                lista.add(o);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public List<Komentar> dohvatiKomentare(Vikendica vikendica) {
        List<Komentar> lista = new ArrayList<>();
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM komentari WHERE IdV = ?")) {

            upit.setInt(1, vikendica.getidV());
            
            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                Komentar k = new Komentar(
                    rs.getString("Komentar"),
                    rs.getInt("IdV"),
                    rs.getString("korisnicko_ime")
                );

                lista.add(k);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }

    public Poruka zauzeto(Rezervacija rezervacija) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Rezervacije WHERE IdV = ?")) {

            LocalDateTime datumOd = rezervacija.getDatumOd();
            LocalDateTime datumDo = rezervacija.getDatumDo();
            upit.setInt(1, rezervacija.getIdV());

            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                LocalDateTime rezDatumOd = rs.getObject("datumOd", LocalDateTime.class);
                LocalDateTime rezDatumDo = rs.getObject("datumDo", LocalDateTime.class);

                if(((datumOd.compareTo(rezDatumOd) >= 0) && (datumOd.compareTo(rezDatumDo) < 0)) || ((datumDo.compareTo(rezDatumOd) >= 0) && (datumDo.compareTo(rezDatumDo) < 0))) {
                    return new Poruka("N");
                }
            }

            return new Poruka("U");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public Poruka rezervisi(Rezervacija rezervacija) {
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("INSERT INTO Rezervacije VALUES(0, ?, ?, ?, ?, ?, ?, ?, 'C', '')")) {

            upit.setInt(1, rezervacija.getIdV());
            upit.setString(2, rezervacija.getKorisnicko_ime());
            upit.setObject(3, rezervacija.getDatumOd());
            upit.setObject(4, rezervacija.getDatumDo());
            upit.setInt(5, rezervacija.getOdrasli());
            upit.setInt(6, rezervacija.getDeca());
            upit.setObject(7, rezervacija.getRezervisan());

            if(upit.executeUpdate() > 0) {
                return new Poruka("U");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Poruka("N");
    }

    public int dohvati30() {
        int rezervacije = 0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Rezervacije WHERE status = 'P'")) {

            LocalDateTime datum = LocalDateTime.now();
            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                LocalDateTime rez = rs.getObject("rezervisan", LocalDateTime.class);
                if(ChronoUnit.DAYS.between(rez, datum) <= 30 && rez.isBefore(datum)) rezervacije++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rezervacije;
    }

    public int dohvati7() {
        int rezervacije = 0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Rezervacije WHERE status = 'P'")) {

            LocalDateTime datum = LocalDateTime.now();
            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                LocalDateTime rez = rs.getObject("rezervisan", LocalDateTime.class);
                if(ChronoUnit.DAYS.between(rez, datum) <= 7 && rez.isBefore(datum)) rezervacije++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rezervacije;
    }

    public int dohvati24() {
        int rezervacije = 0;
        try (Connection conn = DB.source().getConnection();
                PreparedStatement upit = conn.prepareStatement("SELECT * FROM Rezervacije WHERE status = 'P'")) {

            LocalDateTime datum = LocalDateTime.now();
            ResultSet rs = upit.executeQuery();
            while(rs.next()) {
                LocalDateTime rez = rs.getObject("rezervisan", LocalDateTime.class);
                if(ChronoUnit.HOURS.between(rez, datum) <= 24 && rez.isBefore(datum)) rezervacije++;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rezervacije;
    }
}