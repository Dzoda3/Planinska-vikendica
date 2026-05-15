package com.example.demo.kontroleri;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.db.VikendicaRepo;
import com.example.demo.modeli.Komentar;
import com.example.demo.modeli.Korisnik;
import com.example.demo.modeli.Ocena;
import com.example.demo.modeli.Poruka;
import com.example.demo.modeli.Rezervacija;
import com.example.demo.modeli.Vikendica;

@RestController
@RequestMapping("/vikendice")
@CrossOrigin(origins = "http://localhost:4200")
public class VikendicaKontroler {

    @GetMapping("/dohvatiSve")
    public List<Vikendica> dohvatiSve() {
        return new VikendicaRepo().dohvatiSve();
    }

    @PostMapping("/filtriraj")
    public List<Vikendica> filtriraj(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().filtriraj(vikendica);
    }

    @GetMapping("/brojVikendica")
    public int brojVikendica() {
        return new VikendicaRepo().brojVikendica();
    }

    @PostMapping("/dohvatiVikendicu")
    public Vikendica dohvatiVikendicu(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().dohvatiVikendicu(vikendica);
    }

    @PostMapping("/dohvatiMoje")
    public List<Vikendica> dohvatiMoje(@RequestBody Korisnik korisnik) {
        return new VikendicaRepo().dohvatiMoje(korisnik);
    }

    @PostMapping("/azuriraj")
    public Poruka azuriraj(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().azuriraj(vikendica);
    }

    @PostMapping("/obrisi")
    public Poruka obrisi(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().obrisi(vikendica);
    }

    @PostMapping("/dodaj/{korisnicko_ime}")
    public Poruka dodaj(@RequestBody Vikendica vikendica, @PathVariable String korisnicko_ime) {
        return new VikendicaRepo().dodaj(vikendica, korisnicko_ime);
    }

    @PostMapping("/dohvatiRezervacije")
    public List<Rezervacija> dohvatiRezervacije(@RequestBody Korisnik korisnik) {
        return new VikendicaRepo().dohvatiRezervacije(korisnik);
    }

    @PostMapping("/potvrdi")
    public Poruka potvrdi(@RequestBody Rezervacija rezervacija) {
        return new VikendicaRepo().potvrdi(rezervacija);
    }

    @PostMapping("/odbij/{idR}")
    public Poruka odbij(@PathVariable int idR, @RequestBody String komentar) {
        return new VikendicaRepo().odbij(idR, komentar);
    }

    @PostMapping("/otkazi")
    public Poruka otkazi(@RequestBody Rezervacija rezervacija) {
        return new VikendicaRepo().otkazi(rezervacija);
    }

    @PostMapping("/dohvatiSlike")
    public List<String> dohvatiSlike(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().dohvatiSlike(vikendica);
    }

    @PostMapping("/dohvatiOcene")
    public List<Ocena> dohvatiOcene(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().dohvatiOcene(vikendica);
    }

    @PostMapping("/dohvatiKomentare")
    public List<Komentar> dohvatiKomentare(@RequestBody Vikendica vikendica) {
        return new VikendicaRepo().dohvatiKomentare(vikendica);
    }

    @PostMapping("/zauzeto")
    public Poruka zauzeto(@RequestBody Rezervacija rezervacija) {
        return new VikendicaRepo().zauzeto(rezervacija);
    }

    @PostMapping("/rezervisi")
    public Poruka rezervisi(@RequestBody Rezervacija rezervacija) {
        return new VikendicaRepo().rezervisi(rezervacija);
    }

    @GetMapping("/dohvati30")
    public int dohvati30() {
        return new VikendicaRepo().dohvati30();
    }

    @GetMapping("/dohvati7")
    public int dohvati7() {
        return new VikendicaRepo().dohvati7();
    }

    @GetMapping("/dohvati24")
    public int dohvati24() {
        return new VikendicaRepo().dohvati24();
    }
}
